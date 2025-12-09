import sendgrid from '@sendgrid/mail';

// Vercel / Netlify function
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL; // must be a verified sender in SendGrid
  const TO_EMAIL = process.env.TO_EMAIL || 'praveenjb24@gmail.com';

  if (!SENDGRID_API_KEY || !FROM_EMAIL) {
    return res.status(500).json({ error: 'SendGrid not configured on server' });
  }

  sendgrid.setApiKey(SENDGRID_API_KEY);

  const { name, email, phone, message, subject } = req.body || {};

  const finalSubject = subject || `Website Enquiry from ${name || 'Visitor'}`;
  const text = `From: ${name || 'Visitor'} <${email || 'No email provided'}>\nPhone: ${phone || 'No phone provided'}\n\nMessage:\n${message || ''}`;

  try {
    await sendgrid.send({
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: finalSubject,
      text,
      html: `<pre>${text.replace(/</g, '&lt;')}</pre>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid error', err);
    return res.status(500).json({ ok: false, error: err?.message || 'SendGrid error' });
  }
}
