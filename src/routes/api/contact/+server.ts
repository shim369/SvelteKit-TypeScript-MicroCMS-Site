import nodemailer from 'nodemailer';
import { error, json } from '@sveltejs/kit';
import {
  CONTACT_TO_EMAIL,
  RECAPTCHA_SECRET_KEY,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER
} from '$app/env/private';
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
  const result: {
    success: boolean;
    score?: number;
    action?: string;
    hostname?: string;
    'error-codes'?: string[];
  } = await res.json();
  const ok = result.success && result.action === 'submit' && (result.score ?? 0) >= 0.5;
  if (!ok) {
    console.warn(`reCAPTCHA verification failed: ${JSON.stringify(result)}`);
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

  if (RECAPTCHA_SECRET_KEY) {
    if (!googleReCaptchaToken) {
      console.warn('reCAPTCHA token is missing');
    }
    if (!googleReCaptchaToken || !(await verifyRecaptcha(RECAPTCHA_SECRET_KEY, googleReCaptchaToken))) {
      error(403, 'reCAPTCHA verification failed');
    }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_TO_EMAIL,
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
