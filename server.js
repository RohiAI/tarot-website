/**
 * Simple Node.js server for Mystic Tarot website
 * This server can be used for local development or basic hosting
 */

// Load environment variables
i sthis good and ready to be pasted -1️⃣ server.js (updated)
require('dotenv').config();
const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get Calendly URL
app.get('/api/config', (req, res) => {
    res.json({
        calendlyUrl: process.env.CALENDLY_URL
    });
});

// ✅ New: Products endpoint
app.get('/api/products', (req, res) => {
    const products = [
        {
            name: "Tarot Consult",
            price: "$45",
            link: "https://buy.stripe.com/4gMcN5bAo6Lg7ba7aIgnK02"
        },
        {
            name: "Tarot and Numerology Consult",
            price: "$55",
            link: "https://buy.stripe.com/14A3cv8oc4D8brqbqYgnK01"
        }
    ];
    res.json(products);
});

// Start server with error handling
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Error starting server:', err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => process.exit(0));
});
