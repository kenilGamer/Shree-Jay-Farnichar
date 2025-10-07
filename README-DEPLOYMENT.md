# 🚀 Lumelight Interior - VPS Deployment Guide

## Server Information
- **OS**: Ubuntu 25.04
- **Domain**: lumelightinterior.in

## 📋 Prerequisites
- Root access to the VPS
- Domain pointing to the server IP
- SSH access configured

## 🛠️ Deployment Steps

### 1. Initial Server Setup
```bash
# Make scripts executable
chmod +x *.sh

# Run the main deployment script
sudo ./deploy.sh
```

### 2. Application Setup
```bash
# Clone your repository to /var/www/lumelight-interior
cd /var/www/lumelight-interior

# Setup the application
sudo ./setup-app.sh
```

### 3. Nginx Configuration
```bash
# Configure Nginx
sudo ./setup-nginx.sh
```

### 4. SSL Certificate Setup
```bash
# Setup SSL certificates
sudo ./setup-ssl.sh
```

### 5. Start Application
```bash
# Start the application
sudo ./start-app.sh
```

## 🔧 Alternative: Docker Deployment

### Using Docker Compose
```bash
# Copy environment file
cp .env.example .env

# Edit environment variables
nano .env

# Start with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring & Maintenance

### System Monitoring
```bash
# Run system monitoring
sudo ./monitor.sh

# Generate detailed report
sudo ./monitor.sh --report
```

### Backup
```bash
# Create backup
sudo ./backup.sh
```

### Logs
```bash
# View PM2 logs
pm2 logs lumelight-backend

# View Nginx logs
tail -f /var/log/nginx/lumelight-interior-access.log
tail -f /var/log/nginx/lumelight-interior-error.log
```

## 🔐 Security Configuration

### Firewall
```bash
# Check firewall status
ufw status

# Allow specific ports
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
```

### SSL Auto-renewal
```bash
# Test certificate renewal
certbot renew --dry-run

# Check renewal cron job
cat /etc/cron.d/certbot-renew
```

## 🚨 Troubleshooting

### Common Issues

#### Application Not Starting
```bash
# Check PM2 status
pm2 list

# Restart application
pm2 restart lumelight-backend

# Check logs
pm2 logs lumelight-backend --lines 50
```

#### Nginx Issues
```bash
# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Check Nginx status
systemctl status nginx
```

#### Database Issues
```bash
# Check MongoDB status
systemctl status mongod

# Restart MongoDB
systemctl restart mongod
```

#### SSL Issues
```bash
# Check certificate status
certbot certificates

# Renew certificate manually
certbot renew --force-renewal
```

## 📁 File Structure
```
/var/www/lumelight-interior/
├── backend/                 # Backend application
├── frontend/               # Frontend application
├── ecosystem.config.js     # PM2 configuration
├── deploy.sh              # Main deployment script
├── setup-app.sh           # Application setup
├── setup-nginx.sh         # Nginx configuration
├── setup-ssl.sh           # SSL setup
├── start-app.sh           # Start application
├── monitor.sh             # System monitoring
├── backup.sh              # Backup script
└── docker-compose.prod.yml # Docker configuration
```

## 🔄 Updates & Maintenance

### Application Updates
```bash
# Pull latest changes
cd /var/www/lumelight-interior
git pull origin main

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Build frontend
cd frontend && npm run build

# Restart application
pm2 restart lumelight-backend
```

### System Updates
```bash
# Update system packages
apt update && apt upgrade -y

# Restart services if needed
systemctl restart nginx
systemctl restart mongod
```

## 📞 Support

### Useful Commands
```bash
# Check system resources
htop

# Check disk usage
df -h

# Check memory usage
free -h

# Check network connections
netstat -tulpn

# Check running processes
ps aux | grep node
```

### Log Locations
- **Application Logs**: `/var/log/pm2/`
- **Nginx Logs**: `/var/log/nginx/`
- **System Logs**: `/var/log/syslog`
- **MongoDB Logs**: `/var/log/mongodb/`

## 🎯 Performance Optimization

### Nginx Optimization
- Gzip compression enabled
- Static file caching configured
- Security headers implemented

### Application Optimization
- PM2 process management
- MongoDB indexing
- Redis caching (if enabled)

### Monitoring
- System resource monitoring
- Application health checks
- SSL certificate monitoring
- Automated backups

---

**Note**: Always test changes in a staging environment before applying to production. Keep regular backups and monitor system resources.
