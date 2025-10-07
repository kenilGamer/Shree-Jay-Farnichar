#!/bin/bash

# Lumelight Interior - Application Start Script

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

print_status "Starting Lumelight Interior application..."

# Navigate to application directory
cd $APP_DIR

# Check if application files exist
if [ ! -f "ecosystem.config.js" ]; then
    print_error "ecosystem.config.js not found. Please run setup-app.sh first."
    exit 1
fi

# Stop existing PM2 processes
print_status "Stopping existing PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Start MongoDB (if not running)
print_status "Starting MongoDB..."
systemctl start mongod 2>/dev/null || systemctl start mongodb 2>/dev/null || true

# Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup systemd -u root --hp /root

# Check application status
print_status "Checking application status..."
sleep 5

if pm2 list | grep -q "lumelight-backend.*online"; then
    print_success "Backend application is running!"
else
    print_error "Backend application failed to start!"
    pm2 logs lumelight-backend --lines 20
    exit 1
fi

# Test API endpoint
print_status "Testing API endpoint..."
if curl -s -I http://localhost:5000 | grep -q "200 OK"; then
    print_success "API endpoint is responding!"
else
    print_warning "API endpoint test failed, but application is running."
fi

# Test frontend
print_status "Testing frontend..."
if curl -s -I https://$DOMAIN | grep -q "200 OK"; then
    print_success "Frontend is accessible!"
else
    print_warning "Frontend test failed, but Nginx is running."
fi

# Show application status
print_status "Application Status:"
pm2 list

print_success "Application started successfully!"
print_status "Your application is now running:"
echo "🌐 Website: https://$DOMAIN"
echo "🔧 API: https://$DOMAIN/api"
echo "📊 PM2 Status: pm2 list"
echo "📝 Logs: pm2 logs lumelight-backend"

echo "=================================================="
print_success "Application startup completed!"
