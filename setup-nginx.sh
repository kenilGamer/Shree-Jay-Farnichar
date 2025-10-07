#!/bin/bash

# Lumelight Interior - Nginx Configuration Script

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
APP_DIR="/var/www/$APP_NAME"
NGINX_SITES="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"

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

print_status "Configuring Nginx for Lumelight Interior..."

# Remove default Nginx site
if [ -f "$NGINX_ENABLED/default" ]; then
    print_status "Removing default Nginx site..."
    rm -f $NGINX_ENABLED/default
fi

# Create Nginx configuration
print_status "Creating Nginx configuration..."
cat > $NGINX_SITES/$APP_NAME << EOF
# Lumelight Interior - Nginx Configuration
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Redirect HTTP to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;
    
    # SSL Configuration (will be updated by Certbot)
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
    
    # Root directory
    root $APP_DIR/frontend/dist;
    index index.html;
    
    # Main location block
    location / {
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # File upload size limit
    client_max_body_size 10M;
    
    # Logging
    access_log /var/log/nginx/$APP_NAME-access.log;
    error_log /var/log/nginx/$APP_NAME-error.log;
}

# Redirect www to non-www
server {
    listen 443 ssl http2;
    server_name www.$DOMAIN;
    return 301 https://$DOMAIN\$request_uri;
}
EOF

# Enable the site
print_status "Enabling Nginx site..."
ln -sf $NGINX_SITES/$APP_NAME $NGINX_ENABLED/

# Test Nginx configuration
print_status "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    print_success "Nginx configuration is valid!"
    
    # Reload Nginx
    print_status "Reloading Nginx..."
    systemctl reload nginx
    
    print_success "Nginx configuration completed!"
else
    print_error "Nginx configuration test failed!"
    exit 1
fi

print_status "Next steps:"
echo "1. Run ./setup-ssl.sh to configure SSL certificates"
echo "2. Run ./start-app.sh to start the application"

echo "=================================================="
print_success "Nginx setup completed!"
