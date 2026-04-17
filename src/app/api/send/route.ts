import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sazibalasingam@gmail.com',
      subject: name ? `New message from ${name}` : 'Hello from Sazi Portfolio!',
      replyTo: email,
      html: name ? `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="border-left: 4px solid #000; padding-left: 15px; margin-top: 10px; font-style: italic;">
            ${message}
          </div>
        </div>
      ` : '<p>This is a test email from your portfolio.</p>',
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
