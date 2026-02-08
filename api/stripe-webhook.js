/**
 * Serverless Stripe webhook using Gmail SMTP only
 * Sends Zoom link confirmation emails after payment
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const ZOOM_MEETING_LINK = process.env.ZOOM_MEETING_LINK || 'YOUR_ZOOM_MEETING_LINK';

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name || 'Client';
        const eventDate = session.metadata?.event_date || 'TBD';
        const eventName = session.metadata?.event_name || 'Tarot Reading Session';

        console.log('[WEBHOOK] Payment confirmed for:', customerEmail);

        if (!customerEmail) {
            console.warn('[WEBHOOK] No customer email found, skipping email');
            return res.json({ received: true, emailSent: false, reason: 'No customer email' });
        }

        // Gmail SMTP setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Ruchira - Tarot Numerology Reading" <${process.env.EMAIL_USER}>`,
            to: customerEmail,
            subject: `Your Tarot Reading is Confirmed!`,
            text: `Dear ${customerName},\n\nThank you for your payment for ${eventName} scheduled on ${eventDate}.\n\nJoin Zoom Meeting here: ${ZOOM_MEETING_LINK}\n\nWe look forward to connecting with you!\n\nBest regards,\nRuchira`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('[WEBHOOK] Confirmation email sent to:', customerEmail);
            return res.json({ received: true, emailSent: true });
        } catch (emailError) {
            console.error('[WEBHOOK] Failed to send email:', emailError.message);
            return res.json({ received: true, emailSent: false, error: emailError.message });
        }
    }

    res.json({ received: true });
};
