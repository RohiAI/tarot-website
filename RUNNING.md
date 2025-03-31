# Running the Mystic Tarot Website

This document provides instructions for running the Mystic Tarot website using the Node.js Express server.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Running the Website

### Option 1: Using the Setup Script

The easiest way to get started is to use the included setup script:

1. Navigate to the project directory in your terminal:
   ```
   cd /path/to/tarot_website
   ```

2. Make the setup script executable (if not already):
   ```
   chmod +x setup.sh
   ```

3. Run the setup script:
   ```
   ./setup.sh
   ```

This script will check for Node.js, install dependencies, and start the server automatically.

### Option 2: Manual Setup

If you prefer to set up manually:

1. Navigate to the project directory in your terminal:
   ```
   cd /path/to/tarot_website
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   or for development with auto-restart:
   ```
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Server Features

The Node.js Express server provides the following features:

- Static file serving for HTML, CSS, JavaScript, and images
- API endpoint for contact form submissions (`/api/contact`)
- API endpoint for newsletter subscriptions (`/api/subscribe`)
- Stripe payment integration for online bookings
- Payment success and cancellation pages
- Webhook endpoint for Stripe events
- Logging of form submissions and subscriptions

## Environment Variables

The website uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
NODE_ENV=development
```

Replace the placeholder values with your actual credentials.

## Customizing the Website

### Images

All images are SVG files located in the `images` folder:

- `logo.svg` - Website logo
- `hero-bg.svg` - Hero section background
- `reader.svg` - Tarot reader image
- `cards.svg` - Tarot cards display
- `testimonial.svg` - Testimonial background
- `contact.svg` - Contact section background
- `facebook.svg`, `instagram.svg`, `twitter.svg` - Social media icons
- `favicon.svg` - Website favicon

### Content

Edit the HTML files to update:

- Business name and tagline
- About section information
- Service descriptions and pricing
- Contact information
- Testimonials

### Styling

Modify the CSS in `css/style.css` to change colors, fonts, and other styling elements.

## Email Configuration

To enable email notifications for form submissions:

1. Open `.env` file
2. Update the email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```
   
   > **Note:** For Gmail, you may need to use an "App Password" instead of your regular password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for more information.

3. Uncomment the nodemailer configuration section in `server.js`
4. Update the `from` and `to` email addresses in the `mailOptions` object

## Payment Integration

The website includes Stripe payment integration for booking tarot readings. To set it up:

1. Create a [Stripe account](https://stripe.com) if you don't have one
2. Get your API keys from the Stripe Dashboard
3. Update the `.env` file with your Stripe API keys:
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```

4. For testing, use Stripe's test card numbers:
   - Card Number: `4242 4242 4242 4242`
   - Expiration Date: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

### Setting Up Webhooks

For full payment functionality, set up a Stripe webhook:

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Create a new webhook endpoint pointing to your server's `/webhook` route
3. Add the `checkout.session.completed` event
4. Get the webhook signing secret and add it to your `.env` file:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### Customizing Payment Options

To modify the available services and prices:

1. Update the service cards in `index.html`
2. Update the service prices in the `servicePrices` object in `server.js`
3. Update the service options in the contact form dropdown

## Facebook Integration

To fully enable the Facebook integration:

1. Replace `https://www.facebook.com/mystictarot` with your actual Facebook page URL in all HTML files
2. Replace `YOUR_APP_ID` in the Facebook SDK script with your Facebook App ID
3. Update the Open Graph meta tags for proper social sharing

## Deployment

To deploy this website to a production environment:

1. Choose a hosting provider that supports Node.js (e.g., Heroku, Vercel, Netlify, DigitalOcean)
2. Follow your hosting provider's instructions for deploying a Node.js application
3. Set environment variables for any sensitive information (e.g., email credentials)

## Troubleshooting

- If the server won't start, check that you have Node.js installed and that the required port (3000) is not in use
- If the contact form doesn't submit, check the browser console for JavaScript errors
- If emails aren't being sent, verify your email configuration and credentials
- For Facebook integration issues, ensure your Facebook App ID is correct and the page URL exists

## Support

For additional help or customization, contact:

Email: support@mystictarot.com 