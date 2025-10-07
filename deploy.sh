#!/bin/bash

# Lumelight Interior - VPS Deployment Script
# Ubuntu 25.04 - srv1051246.hstgr.cloud
# IPv4: 88.222.241.176

set -e

echo "🚀 Starting Lumelight Interior Deployment on Ubuntu 25.04"
echo "📍 Server: srv1051246.hstgr.cloud (88.222.241.176)"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="lumelightinterior.in"
APP_NAME="lumelight-interior"
APP_DIR="/var/www/$APP_NAME"
BACKUP_DIR="/var/backups/$APP_NAME"
NGINX_SITES="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"

# Function to print colored output
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

# Update system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
print_status "Installing essential packages..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Node.js 20.x
print_status "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Docker
print_status "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
print_status "Installing Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Nginx
print_status "Installing Nginx..."
apt install -y nginx

# Install PM2 for process management
print_status "Installing PM2..."
npm install -g pm2

# Install Certbot for SSL
print_status "Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Create application directory
print_status "Creating application directory..."
mkdir -p $APP_DIR
mkdir -p $BACKUP_DIR

# Create system user for the application
print_status "Creating application user..."
useradd -r -s /bin/false -d $APP_DIR $APP_NAME || true
chown -R $APP_NAME:$APP_NAME $APP_DIR

# Enable and start services
print_status "Enabling services..."
systemctl enable nginx
systemctl enable docker
systemctl start nginx
systemctl start docker

# Configure firewall
print_status "Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

print_success "System setup completed successfully!"
print_status "Next steps:"
echo "1. Clone your repository to $APP_DIR"
echo "2. Run ./setup-app.sh to configure the application"
echo "3. Run ./setup-ssl.sh to configure SSL certificates"
echo "4. Run ./start-app.sh to start the application"

echo "=================================================="
print_success "Deployment script completed!"
