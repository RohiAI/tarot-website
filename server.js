/**
 * Simple Node.js server for Mystic Tarot website
 * This server can be used for local development or basic hosting
 */

// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get Calendly URL
app.get('/api/config', (req, res) => {
    res.json({
        calendlyUrl: process.env.CALENDLY_URL
    });
});

// Start the server with error handling
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please close the other application or use a different port.`);
    } else {
        console.error('Error starting server:', err.message);
    }
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
        console.log('Server shut down successfully');
        process.exit(0);
    });
}); 