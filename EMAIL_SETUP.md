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

5. **Update the Code:**
   - Open `public/index.html`
   - Find the `EMAILJS_CONFIG` object (around line 550)
   - Update with your credentials:
     ```javascript
     const EMAILJS_CONFIG = {
         enabled: true, // Enable EmailJS
         serviceId: 'your_service_id',
         templateId: 'your_template_id',
         publicKey: 'your_public_key'
     };
     ```
   - Uncomment the `emailjs.send()` call in the `sendConfirmationEmail` function

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
1. Verify all credentials are correct
2. Check browser console for errors
3. Ensure EmailJS script is loaded
4. Verify email service is properly connected in EmailJS dashboard
5. Check EmailJS usage limits

## Support

If you continue to have issues:
- Check Calendly support: https://help.calendly.com/
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Review browser console for error messages
