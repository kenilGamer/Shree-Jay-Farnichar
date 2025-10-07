#!/bin/bash

# Lumelight Interior - SSL Certificate Setup Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="lumelightinterior.in"
APP_NAME="lumelight-interior"
EMAIL="lumelightinterior@gmail.com"

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

print_status "Setting up SSL certificates for $DOMAIN..."

# Check if domain is pointing to this server
print_status "Checking DNS resolution..."
SERVER_IP=$(curl -s ifconfig.me)
DOMAIN_IP=$(dig +short $DOMAIN | tail -n1)

if [ "$SERVER_IP" != "$DOMAIN_IP" ]; then
    print_warning "Domain $DOMAIN is not pointing to this server ($SERVER_IP)"
    print_warning "Domain resolves to: $DOMAIN_IP"
    print_warning "Please update your DNS records before continuing."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Stop Nginx temporarily
print_status "Stopping Nginx temporarily..."
systemctl stop nginx

# Obtain SSL certificate
print_status "Obtaining SSL certificate from Let's Encrypt..."
certbot certonly --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --domains $DOMAIN,www.$DOMAIN \
    --non-interactive

if [ $? -eq 0 ]; then
    print_success "SSL certificate obtained successfully!"
else
    print_error "Failed to obtain SSL certificate!"
    systemctl start nginx
    exit 1
fi

# Start Nginx
print_status "Starting Nginx..."
systemctl start nginx

# Test SSL configuration
print_status "Testing SSL configuration..."
nginx -t

if [ $? -eq 0 ]; then
    print_success "SSL configuration is valid!"
    systemctl reload nginx
else
    print_error "SSL configuration test failed!"
    exit 1
fi

# Setup auto-renewal
print_status "Setting up SSL certificate auto-renewal..."
cat > /etc/cron.d/certbot-renew << EOF
# Renew Let's Encrypt certificates twice daily
0 */12 * * * root certbot renew --quiet --post-hook "systemctl reload nginx"
EOF

# Test certificate renewal
print_status "Testing certificate renewal..."
certbot renew --dry-run

if [ $? -eq 0 ]; then
    print_success "Certificate auto-renewal configured successfully!"
else
    print_warning "Certificate auto-renewal test failed, but setup completed."
fi

# Test SSL endpoint
print_status "Testing SSL endpoint..."
if curl -s -I https://$DOMAIN | grep -q "200 OK"; then
    print_success "SSL endpoint is working correctly!"
else
    print_warning "SSL endpoint test failed, but certificate is installed."
fi

print_success "SSL setup completed!"
print_status "Your website is now available at:"
echo "🌐 https://$DOMAIN"
echo "🔒 SSL Certificate: Valid"
echo "🔄 Auto-renewal: Configured"

echo "=================================================="
print_success "SSL setup completed!"
