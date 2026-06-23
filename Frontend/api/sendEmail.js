import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // -------------------------------------------------
  // DEBUG – dump the request payload so we can see it
  // -------------------------------------------------
  console.log('📨 sendEmail payload →', JSON.stringify(req.body, null, 2));

  const { to, subject, html } = req.body;

  if (!to || !subject || !html) {
    // Return the payload we received so we can debug it in the browser
    return res.status(400).json({
      error: 'Missing required fields: to, subject, html',
      received: req.body,
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error));
      return res.status(400).json({ success: false, error: error.message, details: error });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
