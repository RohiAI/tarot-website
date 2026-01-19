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

// Initialize EmailJS only if configured
if (process.env.EMAILJS_PUBLIC_KEY) {
    try {
        emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
        console.log('[STRIPE WEBHOOK] EmailJS initialized');
    } catch (initError) {
        console.warn('[STRIPE WEBHOOK] Failed to initialize EmailJS:', initError.message);
    }
} else {
    console.warn('[STRIPE WEBHOOK] EMAILJS_PUBLIC_KEY not set. Email confirmations will be skipped.');
}

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
        
        console.log('[STRIPE WEBHOOK] Payment confirmed - Attempting to send confirmation email:', {
            customerEmail: customerEmail,
            customerName: customerName,
            eventName: eventName,
            eventDate: eventDate,
            sessionId: session.id
        });
        
        // Check if EmailJS is configured
        const hasEmailJSConfig = !!(
            process.env.EMAILJS_SERVICE_ID && 
            process.env.EMAILJS_TEMPLATE_ID && 
            process.env.EMAILJS_PUBLIC_KEY
        );
        
        if (!hasEmailJSConfig) {
            console.warn('[STRIPE WEBHOOK] EmailJS not configured. Skipping email confirmation.');
            console.warn('[STRIPE WEBHOOK] Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY environment variables to enable email confirmations.');
            return res.json({ received: true, emailSent: false, reason: 'EmailJS not configured' });
        }
        
        // Check if customer email exists
        if (!customerEmail) {
            console.warn('[STRIPE WEBHOOK] No customer email found in session. Cannot send confirmation email.');
            return res.json({ received: true, emailSent: false, reason: 'No customer email' });
        }
        
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
            
            console.log('[STRIPE WEBHOOK] Sending confirmation email to:', customerEmail);
            
            const emailResponse = await emailjs.send(
                process.env.EMAILJS_SERVICE_ID,
                process.env.EMAILJS_TEMPLATE_ID,
                emailParams
            );
            
            console.log('[STRIPE WEBHOOK] ✅ Confirmation email sent successfully!', {
                status: emailResponse.status,
                text: emailResponse.text,
                recipient: customerEmail
            });
            
            return res.json({ received: true, emailSent: true, recipient: customerEmail });
        } catch (emailError) {
            console.error('[STRIPE WEBHOOK] ❌ Failed to send email:', {
                error: emailError,
                message: emailError.message || emailError,
                recipient: customerEmail,
                stack: emailError.stack
            });
            // Don't fail the webhook if email fails - payment was successful
            return res.json({ received: true, emailSent: false, error: emailError.message });
        }
    }

    // Return success
    res.json({ received: true });
};
