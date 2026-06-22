// app/api/contact/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    console.log('🚀 Contact API called'); // <-- will show if route is hit

    const data = await req.json();
    console.log('📦 Received data:', data); // <-- see what’s coming in

    // Validation – same fields as your form
    if (!data.firstName || !data.email || !data.eventType || !data.message) {
      return new Response(
        JSON.stringify({ error: 'First name, email, event type and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // --- Send to admin ---
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'amenpicture@outlook.com',
      replyTo: data.email,
      subject: `📸 New Contact - ${data.eventType} from ${data.firstName}`,
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
    });
    console.log('✅ Admin email sent');

    // --- Customer auto-reply ---
    await transporter.sendMail({
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
    });
    console.log('✅ Customer email sent');

    // WhatsApp link (optional)
    const whatsappLink = `https://wa.me/12408551199?text=Hi%2C%20I%20just%20submitted%20a%20contact%20form%20for%20${encodeURIComponent(data.eventType)}`;

    return Response.json({
      success: true,
      whatsappLink,
      message: 'Thank you! Your booking request has been received.',
    });
  } catch (error) {
    console.error('❌ Contact API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send your message. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}