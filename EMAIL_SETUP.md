# Email Confirmation Setup Guide

## Problem
Clients are not receiving confirmation emails when they book a session through Calendly.

## Solution 1: Enable Calendly's Built-in Email Notifications (RECOMMENDED)

Calendly automatically sends confirmation emails, but they need to be enabled in your Calendly account settings.

### Steps to Enable Calendly Email Notifications:

1. **Log in to your Calendly account** at https://calendly.com
2. Go to **Settings** → **Notifications**
3. Under **Email Notifications**, ensure the following are enabled:
   - ✅ **Invitee receives confirmation email** - This sends an email to the client when they book
   - ✅ **You receive notification email** - This sends you an email when someone books
4. **Check your email settings:**
   - Go to **Settings** → **Email & Calendar**
   - Verify your email address is correct
   - Check that emails are not going to spam folder
5. **Test the booking flow:**
   - Make a test booking
   - Check both your inbox and spam folder
   - Verify the client receives the confirmation email

### If Emails Still Don't Arrive:

- **Check spam/junk folder** - Calendly emails sometimes get filtered
- **Verify email address** - Make sure the email address in Calendly settings is correct
- **Check email provider** - Some email providers (like corporate emails) may block automated emails
- **Contact Calendly support** - If the issue persists, contact Calendly support

## Solution 2: Custom Email Confirmation with EmailJS (OPTIONAL)

If you want to send custom confirmation emails in addition to Calendly's emails, you can set up EmailJS.

### Steps to Set Up EmailJS:

1. **Sign up for EmailJS:**
   - Go to https://www.emailjs.com/
   - Create a free account (allows 200 emails/month)

2. **Set up Email Service:**
   - Go to **Email Services** in EmailJS dashboard
   - Add your email service (Gmail, Outlook, etc.)
   - Follow the setup instructions for your email provider

3. **Create Email Template:**
   - Go to **Email Templates**
   - Create a new template
   - Use these variables in your template:
     - `{{to_name}}` - Client's name
     - `{{to_email}}` - Client's email
     - `{{event_name}}` - Type of reading
     - `{{event_date}}` - Scheduled date/time
     - `{{message}}` - Custom message

4. **Get Your Credentials:**
   - **Service ID**: Found in Email Services section
   - **Template ID**: Found in Email Templates section
   - **Public Key**: Found in Account → General section

5. **Set Environment Variables:**
   - The code now automatically fetches EmailJS configuration from the server
   - Set these environment variables in your deployment (Vercel, Netlify, etc.) or `.env` file:
     ```
     EMAILJS_SERVICE_ID=your_service_id
     EMAILJS_TEMPLATE_ID=your_template_id
     EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - The email confirmation code is now **automatically enabled** when these variables are set
   - No code changes needed - just set the environment variables!

6. **Test:**
   - Make a test booking
   - Check that the custom confirmation email is sent

## Important Notes

- **Calendly emails should work automatically** - The primary solution is to enable Calendly's built-in notifications
- **EmailJS is optional** - Only use if you need custom email templates or additional functionality
- **Check spam folders** - Always check spam/junk folders if emails aren't arriving
- **Email limits** - EmailJS free tier allows 200 emails/month

## Troubleshooting

### Emails not arriving:
1. Check Calendly notification settings
2. Verify email address is correct
3. Check spam/junk folder
4. Test with a different email address
5. Check email provider settings (some block automated emails)

### EmailJS not working:
1. Verify all environment variables are set correctly (EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY)
2. Check browser console for errors (look for `[EMAIL]` prefixed messages)
3. Check server logs for `[STRIPE WEBHOOK]` messages if using Stripe payments
4. Ensure EmailJS script is loaded (should be automatic)
5. Verify email service is properly connected in EmailJS dashboard
6. Check EmailJS usage limits
7. For Calendly bookings: Check browser console for `[EMAIL]` logs when a booking is made
8. For Stripe payments: Check webhook logs for `[STRIPE WEBHOOK]` messages

## Support

If you continue to have issues:
- Check Calendly support: https://help.calendly.com/
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Review browser console for error messages
