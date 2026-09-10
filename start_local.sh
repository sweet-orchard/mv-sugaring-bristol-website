#!/bin/bash

echo "Starting Maria's Website Locally..."
echo "==================================="

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ Error: npm is not installed!"
    echo "You need to install Node.js to run this website locally."
    echo "Please download and install it from here: https://nodejs.org/"
    echo "After installing, close this terminal, open a new one, and run this script again."
    exit 1
fi

echo "✅ Node.js and npm are installed."
echo "Installing dependencies (this might take a minute)..."
npm install

echo "Starting the development server..."
npm run dev
