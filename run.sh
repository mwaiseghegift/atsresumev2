#!/bin/bash

# Exit on error
set -e

echo "Starting ATS Resume V2..."

# Start Backend (Django) in background
echo "Starting Backend (Django)..."
cd api
source env/bin/activate || source env/Scripts/activate
python manage.py runserver &
BACKEND_PID=$!
cd ..

# Start UI (Next.js)
echo "Starting UI (Next.js)..."
cd ui
npm run dev &
UI_PID=$!
cd ..

# Cleanup background processes on exit
trap "kill $BACKEND_PID $UI_PID; echo 'Stopping Backend and UI...'; exit" INT TERM EXIT

echo "Started! Backend (PID: $BACKEND_PID) and UI (PID: $UI_PID) are running."
echo "Press Ctrl+C to stop both."

wait
