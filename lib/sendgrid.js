import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail({ firstName, lastName, email, phone, eventType, eventDate, location, budget, message }) {
  // 1. Notify Amen Pictures
  await sgMail.send({
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: `New Booking Inquiry — ${eventType} from ${firstName} ${lastName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0A0A0A;padding:24px;text-align:center;">
          <h1 style="color:#C9A84C;font-size:24px;margin:0;">Amen Pictures</h1>
          <p style="color:#999;margin:8px 0 0;">New Booking Inquiry</p>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #eee;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#555;width:140px;"><strong>Name:</strong></td><td style="padding:8px 0;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Email:</strong></td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Phone:</strong></td><td style="padding:8px 0;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Event Type:</strong></td><td style="padding:8px 0;">${eventType || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Event Date:</strong></td><td style="padding:8px 0;">${eventDate || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Location:</strong></td><td style="padding:8px 0;">${location || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;color:#555;"><strong>Budget:</strong></td><td style="padding:8px 0;">${budget || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f9f9f9;border-radius:8px;">
            <strong style="color:#555;">Message:</strong>
            <p style="margin:8px 0 0;color:#333;">${message}</p>
          </div>
        </div>
        <div style="padding:16px;text-align:center;background:#f5f5f5;">
          <p style="color:#999;font-size:12px;margin:0;">Amen Pictures — Silver Spring, MD &amp; Addis Ababa, Ethiopia</p>
        </div>
      </div>
    `,
  });

  // 2. Auto-reply to client
  await sgMail.send({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'We received your inquiry — Amen Pictures',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0A0A0A;padding:24px;text-align:center;">
          <h1 style="color:#C9A84C;font-size:24px;margin:0;">Amen Pictures</h1>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #eee;">
          <h2 style="color:#0A0A0A;">Thank you, ${firstName}!</h2>
          <p style="color:#555;line-height:1.6;">We've received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
          <p style="color:#555;line-height:1.6;">In the meantime, feel free to browse our portfolio or follow us on Instagram <a href="https://www.instagram.com/amen_pictures_/" style="color:#C9A84C;">@amen_pictures_</a>.</p>
          <div style="margin-top:24px;text-align:center;">
            <a href="https://amenpictures.com/portfolio" style="background:#C9A84C;color:#000;padding:12px 32px;border-radius:999px;text-decoration:none;font-weight:600;">View Our Portfolio</a>
          </div>
        </div>
        <div style="padding:16px;text-align:center;background:#f5f5f5;">
          <p style="color:#999;font-size:12px;margin:0;">📍 8209 Fenton St, Suite #9, Silver Spring, MD 20910</p>
          <p style="color:#999;font-size:12px;margin:4px 0 0;">📞 +1 (240) 855-1199 | ✉ info@amenpictures.com</p>
        </div>
      </div>
    `,
  });
}

export async function sendBookingConfirmation({ booking, clientEmail }) {
  await sgMail.send({
    to: clientEmail,
    from: process.env.EMAIL_FROM,
    subject: `Booking Confirmed — ${booking.eventType} on ${new Date(booking.eventDate).toLocaleDateString()}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0A0A0A;padding:24px;text-align:center;">
          <h1 style="color:#C9A84C;font-size:24px;margin:0;">Booking Confirmed ✓</h1>
        </div>
        <div style="padding:32px;background:#fff;">
          <h2>Your booking is confirmed!</h2>
          <p style="color:#555;">Event: <strong>${booking.eventType}</strong></p>
          <p style="color:#555;">Date: <strong>${new Date(booking.eventDate).toLocaleDateString()}</strong></p>
          <p style="color:#555;">Package: <strong>${booking.package}</strong></p>
          <p style="color:#555;">Deposit: <strong>$${booking.depositAmount}</strong> (paid)</p>
        </div>
      </div>
    `,
  });
}
