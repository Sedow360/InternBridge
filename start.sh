#!/bin/bash

echo "Starting InterBridge Application..."
echo

echo "Setting up Python virtual environment..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo
echo "Starting Flask backend server..."
echo "Backend will be available at http://localhost:5000"
echo
echo "To access the frontend:"
echo "1. Open another terminal"
echo "2. Navigate to the 'frontend' folder"
echo "3. Open 'index.html' in your browser"
echo
echo "Press Ctrl+C to stop the server"
echo

python app.py
