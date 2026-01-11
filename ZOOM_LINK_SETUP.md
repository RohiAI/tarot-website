# Automatic Zoom Link Setup Guide

This guide explains how to automatically send Zoom links when a session is confirmed and payment is accepted.

## Solution 1: Calendly + Zoom Integration (RECOMMENDED - Easiest)

Calendly has built-in Zoom integration that automatically creates and sends Zoom links when bookings are confirmed.

### Steps to Set Up:

1. **Connect Zoom to Calendly:**
   - Log in to your Calendly account at https://calendly.com
   - Go to **Integrations** → **Zoom**
   - Click **Connect** and authorize Calendly to access your Zoom account
   - Follow the authorization steps

2. **Add Zoom to Your Event Type:**
   - Go to **Event Types** in Calendly
   - Select your "Tarot Reading" event type
   - Scroll to **Location** section
   - Select **Zoom** as the location
   - Save the changes

3. **Configure Email Settings:**
   - Go to **Settings** → **Notifications**
   - Ensure **"Invitee receives confirmation email"** is enabled
   - The Zoom link will automatically be included in the confirmation email

**Result:** When someone books a session, Calendly will:
- Automatically create a Zoom meeting
- Include the Zoom link in the confirmation email
- Send the link to both you and the client

## Solution 2: EmailJS with Zoom Link (For Custom Emails)

If you want to send custom emails with Zoom links using EmailJS:

### Steps:

1. **Get Your Zoom Meeting Link:**
   - Option A: Use a recurring Zoom meeting link (same link for all sessions)
   - Option B: Generate Zoom links programmatically using Zoom API
   - Option C: Manually create Zoom meetings and add links to emails

2. **Set Up EmailJS:**
   - Sign up at https://www.emailjs.com/
   - Create an email service and template
   - Add your Zoom link to the email template

3. **Update the Code:**
   - Open `public/index.html`
   - Find the `sendConfirmationEmail` function
   - Add your Zoom link to the email template
   - Configure EmailJS (see EMAIL_SETUP.md)

### Example Email Template with Zoom Link:

```
Subject: Booking Confirmation - Tarot Reading Session

Dear [Client Name],

Thank you for booking a Tarot Reading Session!

Your session is scheduled for: [Date/Time]

Join Zoom Meeting:
[Zoom Link]

Meeting ID: [Meeting ID]
Passcode: [Passcode] (if applicable)

We look forward to connecting with you!

Best regards,
Ruchira
```

## Solution 3: Stripe Webhook + Serverless Function (For Payment Confirmation)

If you want to send Zoom links only after payment is confirmed via Stripe:

### Option A: Use Zapier/Make.com (No Coding Required)

1. **Set Up Zapier/Make.com:**
   - Create account at https://zapier.com or https://make.com
   - Create a new Zap/Scenario

2. **Connect Stripe:**
   - Add Stripe as trigger
   - Select "Payment Succeeded" event
   - Connect your Stripe account

3. **Add Email Action:**
   - Add Gmail/Outlook as action
   - Create email template with Zoom link
   - Send to customer email from Stripe payment

### Option B: Use Serverless Function (Vercel/Netlify)

1. **Create Serverless Function:**
   - Deploy to Vercel or Netlify
   - Create API endpoint for Stripe webhook
   - Send email with Zoom link when payment confirmed

2. **Set Up Stripe Webhook:**
   - Go to Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe-webhook`
   - Select `checkout.session.completed` event

## Solution 4: Manual Zoom Link in Calendly Confirmation Email

If you prefer to manually add Zoom links to Calendly emails:

1. **Get Your Zoom Meeting Link:**
   - Create a recurring Zoom meeting or use your personal meeting room
   - Copy the meeting link

2. **Add to Calendly Email Template:**
   - Go to Calendly → Settings → Email Templates
   - Edit the "Invitee Confirmation" template
   - Add your Zoom link in the email body
   - Save the template

## Recommended Approach

**For most users, Solution 1 (Calendly + Zoom Integration) is the best option** because:
- ✅ Fully automated
- ✅ No coding required
- ✅ Zoom links automatically generated for each booking
- ✅ Works seamlessly with Calendly's email system
- ✅ Handles cancellations and rescheduling automatically

## Troubleshooting

### Zoom link not appearing in emails:
1. Verify Zoom is connected in Calendly Integrations
2. Check that Zoom is selected as location in Event Type settings
3. Ensure email notifications are enabled
4. Check spam folder

### Payment confirmation needed:
- If using Stripe, set up webhook (Solution 3)
- Or use Calendly's payment integration instead of separate Stripe link

### Custom Zoom links:
- Use EmailJS (Solution 2) for full control over email content
- Or manually edit Calendly email templates (Solution 4)

## Next Steps

1. **Set up Calendly + Zoom integration** (Solution 1) - Recommended
2. **Test the booking flow** to ensure Zoom links are sent
3. **Verify emails** are received with Zoom links
4. **Optional:** Set up EmailJS for custom email templates if needed
