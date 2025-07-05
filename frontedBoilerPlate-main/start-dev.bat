@echo off
echo Starting React development server with increased memory...
set NODE_OPTIONS=--max-old-space-size=4096
npm start 