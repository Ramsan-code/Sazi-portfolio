import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['sazibalasingam@gmail.com'],
      subject: `New Transmission from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; border: 4px solid #000; padding: 20px; background-color: #f4f4f4;">
          <h1 style="text-transform: uppercase; margin-bottom: 20px; border-bottom: 4px solid #000; padding-bottom: 10px;">New Mission Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #fff; border: 2px solid #000; padding: 15px; margin-top: 10px;">
            ${message}
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
