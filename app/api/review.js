import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, rating, review } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Review from ${name}`,
      html: `
        <h2>New Customer Review</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rating:</strong> ${rating} / 5</p>
        <hr />
        <p><strong>Review:</strong></p>
        <p>${review}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Review submission error:', error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}