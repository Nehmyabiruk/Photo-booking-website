import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      eventType,
      eventDate,
      location,
      budget,
      message,
    } = body;

    const fullMessage = `
New Booking Request:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Event Type: ${eventType}
Date: ${eventDate}
Location: ${location}
Budget: ${budget}

Message:
${message}
    `;

    // EMAIL (Resend)
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: "New Event Booking Request",
      text: fullMessage,
    });

    // WhatsApp link (unchanged)
    const whatsappMessage = encodeURIComponent(fullMessage);

    const whatsappLink = `https://wa.me/${process.env.ADMIN_PHONE_NUMBER}?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      whatsappLink,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}