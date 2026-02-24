/**
 * Serverless Stripe webhook for Calm Within Me Meditation Library
 * Generates unique access token, stores tracks, and optionally emails the token link
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(process.cwd(), 'purchases.json');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Client';

    if (!customerEmail) {
      console.warn('[WEBHOOK-CALM] No customer email found, skipping token creation');
      return res.json({ received: true, tokenCreated: false });
    }

    // ---------------------------
    // 1️⃣ Generate unique token + store tracks
    // ---------------------------
    const tracksInput = session.metadata?.tracks || ''; // e.g., "1,4,7"
    const tracks = tracksInput.split(',').map(Number).filter(Boolean);
    const token = crypto.randomBytes(16).toString('hex');

    const record = {
      token,
      email: customerEmail,
      tracks,
      timestamp: new Date().toISOString()
    };

    // Read current DB
    let db = [];
    if (fs.existsSync(DB_PATH)) db = JSON.parse(fs.readFileSync(DB_PATH));
    db.push(record);
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

    console.log(`[WEBHOOK-CALM] Token ${token} stored for ${customerEmail}`);

    // ---------------------------
    // 2️⃣ Optional: send access link email
    // ---------------------------
    if (process.env.SEND_CALM_EMAIL === 'true') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: `"Ruchira - Calm Within Me" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `Your Calm Within Me Library Access`,
        text: `Hi ${customerName},

Thank you for your payment! Your Calm Within Me Meditation Library is now ready.

Access your library (valid for 30 days) here:
https://yourdomain.com/calm-library-access?token=${token}

Enjoy your meditations!
- Ruchira`
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('[WEBHOOK-CALM] Access email sent to:', customerEmail);
      } catch (err) {
        console.error('[WEBHOOK-CALM] Failed to send access email:', err.message);
      }
    }

    return res.json({ received: true, token });
  }

  res.json({ received: true });
};