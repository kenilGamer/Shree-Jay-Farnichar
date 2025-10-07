#!/bin/bash

# Lumelight Interior - Backup Script
# Ubuntu 25.04 - srv1051246.hstgr.cloud

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
BACKUP_DIR="/var/backups/$APP_NAME"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/lumelight-backup-$DATE.tar.gz"

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

print_status "Starting backup process for Lumelight Interior..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create temporary backup directory
TEMP_BACKUP_DIR="/tmp/lumelight-backup-$DATE"
mkdir -p $TEMP_BACKUP_DIR

# Backup application files
print_status "Backing up application files..."
if [ -d "$APP_DIR" ]; then
    cp -r $APP_DIR $TEMP_BACKUP_DIR/
    print_success "Application files backed up"
else
    print_warning "Application directory not found: $APP_DIR"
fi

# Backup MongoDB database
print_status "Backing up MongoDB database..."
if command -v mongodump &> /dev/null; then
    mongodump --out $TEMP_BACKUP_DIR/mongodb-backup
    print_success "MongoDB database backed up"
else
    print_warning "mongodump not found, skipping database backup"
fi

# Backup Nginx configuration
print_status "Backing up Nginx configuration..."
if [ -d "/etc/nginx" ]; then
    cp -r /etc/nginx $TEMP_BACKUP_DIR/
    print_success "Nginx configuration backed up"
fi

# Backup SSL certificates
print_status "Backing up SSL certificates..."
if [ -d "/etc/letsencrypt" ]; then
    cp -r /etc/letsencrypt $TEMP_BACKUP_DIR/
    print_success "SSL certificates backed up"
fi

# Backup PM2 configuration
print_status "Backing up PM2 configuration..."
if [ -d "/root/.pm2" ]; then
    cp -r /root/.pm2 $TEMP_BACKUP_DIR/
    print_success "PM2 configuration backed up"
fi

# Create backup archive
print_status "Creating backup archive..."
cd /tmp
tar -czf $BACKUP_FILE lumelight-backup-$DATE/
rm -rf $TEMP_BACKUP_DIR

# Get backup size
BACKUP_SIZE=$(du -h $BACKUP_FILE | cut -f1)

print_success "Backup created successfully!"
print_status "Backup details:"
echo "📁 File: $BACKUP_FILE"
echo "📊 Size: $BACKUP_SIZE"
echo "📅 Date: $(date)"

# Clean up old backups (keep last 7 days)
print_status "Cleaning up old backups..."
find $BACKUP_DIR -name "lumelight-backup-*.tar.gz" -mtime +7 -delete
print_success "Old backups cleaned up"

echo "=================================================="
print_success "Backup process completed!"
