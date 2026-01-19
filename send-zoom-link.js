/**
 * Quick script to send Zoom link to a client
 * 
 * Usage:
 * 1. Update the variables below with the client's information
 * 2. Install nodemailer: npm install nodemailer
 * 3. Update your .env file with email credentials
 * 4. Run: node send-zoom-link.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

// ===== UPDATE THESE VALUES =====
const CLIENT_EMAIL = 'bonifus.gomes@example.com'; // Replace with actual email
const CLIENT_NAME = 'Bonifus Gomes';
const SESSION_DATE = 'January 11th, 2025';
const ZOOM_MEETING_LINK = 'https://zoom.us/j/YOUR_MEETING_ID'; // Replace with actual Zoom link
const ZOOM_MEETING_ID = 'YOUR_MEETING_ID'; // Optional
const ZOOM_PASSCODE = ''; // Optional, if applicable
// ================================

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email content
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: CLIENT_EMAIL,
    subject: 'Your Zoom Link - Tarot Reading Session on January 11th, 2025',
    text: `Dear ${CLIENT_NAME},

Thank you for booking a Tarot Reading Session!

Your session is scheduled for: ${SESSION_DATE}

Join Zoom Meeting:
${ZOOM_MEETING_LINK}
${ZOOM_MEETING_ID ? `\nMeeting ID: ${ZOOM_MEETING_ID}` : ''}
${ZOOM_PASSCODE ? `Passcode: ${ZOOM_PASSCODE}` : ''}

We look forward to connecting with you!

Best regards,
Ruchira
Tarot Numerology Reading`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7b2cbf;">Booking Confirmation - Tarot Reading Session</h2>
            <p>Dear ${CLIENT_NAME},</p>
            <p>Thank you for booking a Tarot Reading Session!</p>
            <p><strong>Your session is scheduled for: ${SESSION_DATE}</strong></p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #7b2cbf; margin-top: 0;">Join Zoom Meeting:</h3>
                <p><a href="${ZOOM_MEETING_LINK}" style="color: #7b2cbf; font-weight: bold; font-size: 16px;">${ZOOM_MEETING_LINK}</a></p>
                ${ZOOM_MEETING_ID ? `<p><strong>Meeting ID:</strong> ${ZOOM_MEETING_ID}</p>` : ''}
                ${ZOOM_PASSCODE ? `<p><strong>Passcode:</strong> ${ZOOM_PASSCODE}</p>` : ''}
            </div>
            <p>We look forward to connecting with you!</p>
            <p>Best regards,<br>Ruchira<br>Tarot Numerology Reading</p>
        </div>
    `
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Sent to:', CLIENT_EMAIL);
    }
});
