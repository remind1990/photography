import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const requestTimestamps: { [key: string]: number } = {}; // In-memory store

export async function POST(request: Request) {
  try {
    const { name, surname, phone, email, comment } = await request.json();
    const userIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('remote-addr') ||
      '';

    const currentTime = Date.now();
    const lastRequestTime = requestTimestamps[userIp];

    if (lastRequestTime && currentTime - lastRequestTime < 60000) {
      return NextResponse.json(
        { message: 'Please wait before making another request.' },
        { status: 429 }
      );
    }
    requestTimestamps[userIp] = currentTime;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      replyTo: email,
      subject: 'New request for Photosession',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">New request for Photosession</h2>
          <p style="font-size: 16px; color: #555;"><strong>Name:</strong> ${name} ${surname}</p>
          <p style="font-size: 16px; color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="font-size: 16px; color: #555;"><strong>Phone:</strong> ${phone}</p>
          <div style="margin-top: 20px;">
            <h4 style="color: #333;">Comment:</h4>
            <p style="font-size: 14px; color: #777; padding: 10px; border-left: 4px solid #007BFF; background-color: #f9f9f9; border-radius: 5px;">
              ${comment}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
