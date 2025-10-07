#!/bin/bash

# Lumelight Interior - Application Setup Script
# Run this after deploy.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="lumelight-interior"
APP_DIR="/var/www/$APP_NAME"
DOMAIN="lumelightinterior.in"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_status "Setting up Lumelight Interior application..."

# Navigate to application directory
cd $APP_DIR

# Install dependencies
print_status "Installing Node.js dependencies..."
if [ -f "package.json" ]; then
    npm install
else
    print_error "package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

# Install backend dependencies
if [ -d "backend" ]; then
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Install frontend dependencies
if [ -d "frontend" ]; then
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

# Create environment files
print_status "Creating environment files..."

# Backend .env
if [ -d "backend" ]; then
    cat > backend/.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lumelight-interior

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-$(openssl rand -hex 32)
JWT_EXPIRES_IN=7d

# Email Configuration (Update with your email service)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# CORS
CORS_ORIGIN=https://$DOMAIN
EOF
fi

# Frontend .env
if [ -d "frontend" ]; then
    cat > frontend/.env << EOF
# API Configuration
VITE_API_URL=https://$DOMAIN/api
VITE_APP_NAME=Lumelight Interior
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=false
EOF
fi

# Create PM2 ecosystem file
print_status "Creating PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'lumelight-backend',
      script: './backend/app.js',
      cwd: '$APP_DIR',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: '/var/log/pm2/lumelight-backend-error.log',
      out_file: '/var/log/pm2/lumelight-backend-out.log',
      log_file: '/var/log/pm2/lumelight-backend.log',
      time: true
    }
  ]
};
EOF

# Create log directory
mkdir -p /var/log/pm2
chown -R $APP_NAME:$APP_NAME /var/log/pm2

# Build frontend
if [ -d "frontend" ]; then
    print_status "Building frontend for production..."
    cd frontend
    npm run build
    cd ..
fi

# Set proper permissions
print_status "Setting permissions..."
chown -R $APP_NAME:$APP_NAME $APP_DIR
chmod -R 755 $APP_DIR

print_success "Application setup completed!"
print_status "Next steps:"
echo "1. Update the environment files with your actual values"
echo "2. Run ./setup-nginx.sh to configure Nginx"
echo "3. Run ./start-app.sh to start the application"

echo "=================================================="
print_success "Application setup completed!"
