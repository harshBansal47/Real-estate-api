#!/bin/bash

# Check for processes using port 8000 and terminate them
echo "Checking for processes using port 3002..."
PORT_PROCESS=$(lsof -ti :3002)
if [ -n "$PORT_PROCESS" ]; then
    echo "Terminating process $PORT_PROCESS using port 3002..."
    kill -9 $PORT_PROCESS || { echo "Failed to terminate the process using port 3002!"; exit 1; }
else
    echo "No process is using port 8000."
fi

echo "Navigating To repository directory"
cd real_estate/real_estate_backend/
ls

echo "Pulling latest changes..."
git restore .
git pull origin main

echo "Installing dependencies"
npm install

echo "Compile TypeScript Code "
#npm run build
screen -ls

echo "Restarting the application"
 #screen -S -X complaint_backend_api quit
 #screen -S complaint_backend_api npm run dev

SESSION_ID=$(screen -ls | grep real_estate_backend | awk '{print $1}')
if [ -n "$SESSION_ID" ]; then
    echo "Terminating existing screen session $SESSION_ID"
    screen -S "$SESSION_ID" -X quit
else
    echo "No existing screen session found."
fi

echo "Creating a new session"
screen -dmS real_estate_backend npm run dev

echo "Deployment completed"