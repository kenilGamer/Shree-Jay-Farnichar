#!/bin/bash

echo "🚀 Starting Shree Jay Furniture Development Environment..."
echo ""

echo "📦 Installing dependencies..."
npm run setup

echo ""
echo "🌐 Starting development servers..."
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:5173"
echo ""

npm run dev
