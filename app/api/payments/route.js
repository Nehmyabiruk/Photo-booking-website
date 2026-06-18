import { NextResponse } from 'next/server';
import { createPaymentIntent, constructWebhookEvent } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingConfirmation } from '@/lib/sendgrid';

// Create payment intent for deposit
export async function POST(request) {
  try {
    const { bookingId, amount, currency = 'usd' } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json({ error: 'Booking ID and amount are required' }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.findById(bookingId);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    // amount should be in cents (e.g. 25000 = $250.00)
    const paymentIntent = await createPaymentIntent(amount, {
      bookingId:  bookingId.toString(),
      clientName: `${booking.firstName} ${booking.lastName}`,
      eventType:  booking.eventType,
    });

    // Save payment intent ID to booking
    await Booking.findByIdAndUpdate(bookingId, {
      stripePaymentIntentId: paymentIntent.id,
      depositAmount: amount / 100,
    });

    return NextResponse.json({
      clientSecret:    paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}

// Stripe webhook handler
export async function PUT(request) {
  const body      = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const bookingId     = paymentIntent.metadata.bookingId;

    try {
      await connectDB();
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        { depositPaid: true, status: 'confirmed' },
        { new: true }
      );

      if (booking) {
        await sendBookingConfirmation({
          booking,
          clientEmail: booking.email,
        });
      }
    } catch (err) {
      console.error('Webhook processing error:', err);
    }
  }

  return NextResponse.json({ received: true });
}
