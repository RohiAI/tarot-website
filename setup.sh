#!/bin/bash

# Mystic Tarot Website Setup Script

echo "===== Mystic Tarot Website Setup ====="
echo "This script will install dependencies and start the server."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR_VERSION -lt 14 ]; then
    echo "Warning: You are using Node.js v$NODE_VERSION."
    echo "This application works best with Node.js v14 or higher."
    echo "Consider upgrading your Node.js version."
    echo ""
fi

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies."
    exit 1
fi

echo ""
echo "Dependencies installed successfully!"
echo ""
echo "Starting the server..."
echo "The website will be available at http://localhost:3000"
echo "Press Ctrl+C to stop the server."
echo ""

# Start the server
npm start 