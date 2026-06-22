import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { BookingSchema } from '@/lib/validations/booking';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || 'amenpicture@outlook.com';

const EMAIL_FROM =
  process.env.EMAIL_USER || 'amenpicture@outlook.com';

export async function POST(request) {
  try {
    const json = await request.json();

    // Validate booking data
    const validatedData = BookingSchema.parse(json);

    // Save booking to database
    const booking = await prisma.booking.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        eventType: validatedData.eventType,
        eventDate: new Date(validatedData.eventDate),
        location: validatedData.location,
        budget: validatedData.budget,
        message: validatedData.message,
      },
    });

    // Admin notification email
    const adminEmail = {
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      replyTo: validatedData.email,
      subject: `📸 New Booking Request - ${validatedData.eventType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin:auto;">
          <h2>New Booking Request</h2>

          <table style="border-collapse: collapse; width:100%;">
            <tr>
              <td><strong>Name</strong></td>
              <td>${validatedData.firstName} ${validatedData.lastName}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${validatedData.email}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${validatedData.phone}</td>
            </tr>

            <tr>
              <td><strong>Event Type</strong></td>
              <td>${validatedData.eventType}</td>
            </tr>

            <tr>
              <td><strong>Event Date</strong></td>
              <td>${validatedData.eventDate}</td>
            </tr>

            <tr>
              <td><strong>Location</strong></td>
              <td>${validatedData.location}</td>
            </tr>

            <tr>
              <td><strong>Budget</strong></td>
              <td>${validatedData.budget || 'Not specified'}</td>
            </tr>
          </table>

          <h3>Message</h3>
          <p>${validatedData.message || 'No message provided.'}</p>

          <hr />
          <p>Booking ID: ${booking.id}</p>
        </div>
      `,
    };

    // Customer confirmation email
    const customerEmail = {
      from: EMAIL_FROM,
      to: validatedData.email,
      subject: 'Booking Request Received - Amen Pictures',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin:auto;">
          <h2>Hello ${validatedData.firstName},</h2>

          <p>
            Thank you for choosing <strong>Amen Pictures</strong>.
          </p>

          <p>
            We have successfully received your booking request.
          </p>

          <h3>Booking Summary</h3>

          <ul>
            <li><strong>Event Type:</strong> ${validatedData.eventType}</li>
            <li><strong>Event Date:</strong> ${validatedData.eventDate}</li>
            <li><strong>Location:</strong> ${validatedData.location}</li>
          </ul>

          <p>
            Our team will review your request and contact you shortly.
          </p>

          <br />

          <p>Best regards,</p>
          <p><strong>Amen Pictures Team</strong></p>
        </div>
      `,
    };

    // Send notifications
    const results = await Promise.allSettled([
      sendEmail(adminEmail),
      sendEmail(customerEmail),
      sendWhatsAppNotification(validatedData),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(
          `Notification ${index + 1} failed:`,
          result.reason
        );
      }
    });

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        message: 'Booking request received successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking Error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process booking request',
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const bookings = await prisma.booking.findMany({
      where: status ? { status } : {},
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}