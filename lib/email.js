export async function sendEmail({ to, subject, html, replyTo }) {
  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to,
      subject,
      html,
      ...(replyTo && { replyTo }),
    });
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Email failed:', error);
    throw error;
  }
}