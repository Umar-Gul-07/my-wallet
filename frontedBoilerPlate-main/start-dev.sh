#!/bin/bash
echo "Starting React development server with increased memory..."
export NODE_OPTIONS=--max-old-space-size=4096
npm start 