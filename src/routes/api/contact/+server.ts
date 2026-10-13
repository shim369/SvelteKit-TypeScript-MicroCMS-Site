import nodemailer from 'nodemailer';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  googleReCaptchaToken?: string;
};

const verifyRecaptcha = async (secret: string, token: string) => {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token })
  });
  const result: { success: boolean; score?: number; action?: string; 'error-codes'?: string[] } =
    await res.json();
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5;
  if (!ok) {
    console.warn('reCAPTCHA verification failed', result);
  }
  return ok;
};

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, message, googleReCaptchaToken }: ContactBody = await request.json();

  if (!name || !email || !message) {
    error(400, 'Missing required fields');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error(400, 'Invalid email');
  }

  if (env.RECAPTCHA_SECRET_KEY) {
    if (!googleReCaptchaToken) {
      console.warn('reCAPTCHA token is missing');
    }
    if (!googleReCaptchaToken || !(await verifyRecaptcha(env.RECAPTCHA_SECRET_KEY, googleReCaptchaToken))) {
      error(403, 'reCAPTCHA verification failed');
    }
  }

  const port = Number(env.SMTP_PORT || '465');
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
  });

  try {
    await transporter.sendMail({
      from: env.SMTP_USER,
      to: env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `【Svelte Base】お問い合わせ: ${name.replace(/[\r\n]/g, ' ')}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\nメッセージ:\n${message}`
    });
  } catch (err) {
    console.error('Failed to send contact mail', err);
    error(500, 'Failed to send mail');
  }

  return json({ ok: true });
};
