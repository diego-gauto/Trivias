import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Ensure this route uses Node runtime (nodemailer requires Node APIs)
export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Simple token-based protection: client must send header 'x-send-email-token'
  const provided = req.headers.get('x-send-email-token');
  const expected = process.env.SEND_EMAILS_TOKEN;

  if (expected && provided !== expected) {
    console.warn('Unauthorized sendEmail call: invalid token');
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { to, username, subject, idTemplateBrevo } = body || {};

    // Allow disabling email sending with an env var (useful for production demos)
    if (process.env.SEND_EMAILS !== 'true') {
      console.log('SEND_EMAILS is not true — skipping actual email send');
      return NextResponse.json({ success: true, skipped: true });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
      return NextResponse.json({ success: false, error: 'Missing email credentials' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    // Simple HTML body; if you want to use templates adapt this to inject template data
    const html = `
      <p>Hola ${username || 'Usuario'},</p>
      <p>Adjuntamos tu resultado: <strong>${subject || 'Resultado de trivia'}</strong></p>
      <p>Template: ${idTemplateBrevo ?? 'n/a'}</p>
    `;

    await transporter.sendMail({
      from: user,
      to,
      subject: subject || 'Resultado de tu trivia',
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('sendEmail error', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
