

// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.firstName || !data.email || !data.eventType || !data.message) {
      return NextResponse.json(
        { error: "First name, email, event type and message are required" },
        { status: 400 }
      );
    }

    const fullMessage = `
New Booking Request Received!

Name: ${data.firstName} ${data.lastName || ''}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Event Type: ${data.eventType}
Date: ${data.eventDate || 'Not specified'}
Location: ${data.location || 'Not specified'}
Budget: ${data.budget || 'Not specified'}

Message:
${data.message}
    `.trim();

    console.log("📸 New Booking Request:");
    console.log(fullMessage);

    // TODO: Connect real email/WhatsApp later when ready

    return NextResponse.json({
      success: true,
      message: "Thank you! Your booking request has been received. We will contact you soon.",
    });

  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({
      error: "Something went wrong. Please try again.",
    }, { status: 500 });
  }
}
