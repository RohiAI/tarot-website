/**
 * Serverless function for handling Stripe webhooks
 * Deploy this to Vercel, Netlify, or similar serverless platform
 * 
 * This function sends Zoom links when payment is confirmed via Stripe
 */

// For Vercel deployment
// For Netlify, use netlify/functions/stripe-webhook.js instead

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const emailjs = require('@emailjs/nodejs');

// Initialize EmailJS
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

// Your Zoom meeting link (or generate dynamically)
const ZOOM_MEETING_LINK = process.env.ZOOM_MEETING_LINK || 'YOUR_ZOOM_MEETING_LINK';

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        // Get customer email from Stripe session
        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name || 'Client';
        
        // Get booking details (you may need to store these in Stripe metadata)
        const eventDate = session.metadata?.event_date || 'TBD';
        const eventName = session.metadata?.event_name || 'Tarot Reading Session';
        
        // Send confirmation email with Zoom link
        try {
            const emailParams = {
                to_email: customerEmail,
                to_name: customerName,
                from_name: 'Ruchira - Tarot Numerology Reading',
                subject: 'Payment Confirmed - Your Zoom Link for Tarot Reading',
                message: `Dear ${customerName},\n\nThank you for your payment!\n\nYour ${eventName} is confirmed for: ${eventDate}\n\nJoin Zoom Meeting:\n${ZOOM_MEETING_LINK}\n\nWe look forward to connecting with you!\n\nBest regards,\nRuchira`,
                event_name: eventName,
                event_date: eventDate,
                zoom_link: ZOOM_MEETING_LINK
            };
            
            await emailjs.send(
                process.env.EMAILJS_SERVICE_ID,
                process.env.EMAILJS_TEMPLATE_ID,
                emailParams
            );
            
            console.log('Confirmation email with Zoom link sent to:', customerEmail);
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Don't fail the webhook if email fails
        }
    }

    // Return success
    res.json({ received: true });
};
