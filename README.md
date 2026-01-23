# Mystic Tarot Website

A professional tarot card reader's website built with HTML, CSS, JavaScript, and Node.js.

## Features

- Responsive design using Bootstrap 5
- Interactive tarot reading services section
- Contact form with Node.js backend
- Newsletter subscription
- Facebook integration
- SVG graphics for all visual elements
- Stripe payment integration for online bookings

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory with the following variables:

```
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
NODE_ENV=development
```

## Running the Server

To start the server in development mode with automatic restart on file changes:

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

The website will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `index.html` - Main HTML file
- `success.html` - Payment success page
- `cancel.html` - Payment cancellation page
- `css/` - CSS stylesheets
- `js/` - JavaScript files
  - `main.js` - Main JavaScript functionality
  - `payment.js` - Stripe payment integration
- `images/` - SVG images and graphics
- `server.js` - Node.js Express server
- `package.json` - Project configuration and dependencies
- `.env` - Environment variables (not included in repository)

## Customization

### Contact Form

The contact form is set up to log form submissions to the console. In a production environment, you should configure the nodemailer settings in `server.js` to send emails:

1. Uncomment the nodemailer code in `server.js`
2. Update the `.env` file with your email credentials
3. Update the `from` and `to` email addresses as needed

### Facebook Integration

To set up the Facebook integration:

1. Replace `YOUR_APP_ID` in the Facebook SDK script in `index.html` with your actual Facebook App ID
2. Update the Facebook page URL in the `data-href` attribute of the `.fb-page` element

### Stripe Payment Integration

The website includes Stripe payment integration for booking tarot readings. To set it up:

1. Create a [Stripe account](https://stripe.com) if you don't have one
2. Get your API keys from the Stripe Dashboard
3. Update the `.env` file with your Stripe API keys
4. To test the payment system, use Stripe's [test card numbers](https://stripe.com/docs/testing#cards):
   - Test Card Number: `4242 4242 4242 4242`
   - Expiration Date: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

For production, update the `.env` file with your live Stripe API keys and set `NODE_ENV=production`.

## Webhook Setup

For full payment functionality, set up a Stripe webhook :

1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Create a new webhook endpoint pointing to your server's `/webhook` route
3. Add the `checkout.session.completed` event
4. Get the webhook signing secret and add it to your `.env` file

## License

MIT.  

## Credits

- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Stripe](https://stripe.com)

---

Created by Mystic Designs | [mystictarot.com](https://mystictarot.com) 