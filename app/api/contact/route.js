// app/api/contact/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.firstName || !data.email || !data.eventType || !data.message) {
      return NextResponse.json(
        { error: 'First name, email, event type and message are required' },
        { status: 400 }
      );
    }

    // --- 1. Configure transporter (same as review route) ---
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- 2. Send email to admin (amenpicture@outlook.com) ---
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'amenpicture@outlook.com',
      replyTo: data.email, // so admin can reply directly to the client
      subject: `📸 New Contact Form - ${data.eventType} from ${data.firstName} ${data.lastName || ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName || ''}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Event Type:</strong> ${data.eventType}</p>
        <p><strong>Event Date:</strong> ${data.eventDate || 'Not specified'}</p>
        <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    };

    // --- 3. Send auto-reply to the client ---
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: data.email,
      subject: 'We received your inquiry – Amen Pictures',
      html: `
        <h2>Hello ${data.firstName},</h2>
        <p>Thank you for contacting Amen Pictures. We have received your inquiry regarding <strong>${data.eventType}</strong>.</p>
        <p>Our team will review your details and get back to you within 24 hours.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>Amen Pictures Team</strong></p>
      `,
    };

    // --- 4. Send both emails ---
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(customerEmail),
    ]);

    // --- 5. (Optional) Generate WhatsApp link for client-side redirect ---
    const whatsappLink = `https://wa.me/12408551199?text=Hi%2C%20I%20just%20submitted%20a%20contact%20form%20for%20${encodeURIComponent(data.eventType)}`;

    console.log(`✅ Contact form from ${data.email} processed successfully`);

    return NextResponse.json({
      success: true,
      whatsappLink, // client will open this in a new tab
      message: 'Thank you! Your booking request has been received. We will contact you soon.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send your message. Please try again or contact us directly.',
      },
      { status: 500 }
    );
  }
}