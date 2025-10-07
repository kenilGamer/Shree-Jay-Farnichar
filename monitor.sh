#!/bin/bash

# Lumelight Interior - System Monitoring Script
# Ubuntu 25.04 - srv1051246.hstgr.cloud

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="lumelight-interior"
DOMAIN="lumelightinterior.in"
LOG_FILE="/var/log/lumelight-monitor.log"

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

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Check system resources
check_system_resources() {
    print_status "Checking system resources..."
    
    # CPU Usage
    CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
        print_warning "High CPU usage: ${CPU_USAGE}%"
        log_message "WARNING: High CPU usage: ${CPU_USAGE}%"
    else
        print_success "CPU usage: ${CPU_USAGE}%"
    fi
    
    # Memory Usage
    MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.1f", $3/$2 * 100.0)}')
    if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
        print_warning "High memory usage: ${MEMORY_USAGE}%"
        log_message "WARNING: High memory usage: ${MEMORY_USAGE}%"
    else
        print_success "Memory usage: ${MEMORY_USAGE}%"
    fi
    
    # Disk Usage
    DISK_USAGE=$(df -h / | awk 'NR==2{print $5}' | sed 's/%//')
    if [ "$DISK_USAGE" -gt 80 ]; then
        print_warning "High disk usage: ${DISK_USAGE}%"
        log_message "WARNING: High disk usage: ${DISK_USAGE}%"
    else
        print_success "Disk usage: ${DISK_USAGE}%"
    fi
}

# Check application status
check_application_status() {
    print_status "Checking application status..."
    
    # Check PM2 processes
    if command -v pm2 &> /dev/null; then
        PM2_STATUS=$(pm2 list | grep "lumelight-backend" | awk '{print $10}')
        if [ "$PM2_STATUS" = "online" ]; then
            print_success "Backend application is running"
        else
            print_error "Backend application is not running"
            log_message "ERROR: Backend application is not running"
        fi
    fi
    
    # Check Nginx
    if systemctl is-active --quiet nginx; then
        print_success "Nginx is running"
    else
        print_error "Nginx is not running"
        log_message "ERROR: Nginx is not running"
    fi
    
    # Check MongoDB
    if systemctl is-active --quiet mongod || systemctl is-active --quiet mongodb; then
        print_success "MongoDB is running"
    else
        print_error "MongoDB is not running"
        log_message "ERROR: MongoDB is not running"
    fi
}

# Check website accessibility
check_website_accessibility() {
    print_status "Checking website accessibility..."
    
    # Check HTTP response
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN)
    if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
        print_success "Website is accessible (HTTP: $HTTP_STATUS)"
    else
        print_error "Website is not accessible (HTTP: $HTTP_STATUS)"
        log_message "ERROR: Website is not accessible (HTTP: $HTTP_STATUS)"
    fi
    
    # Check HTTPS response
    HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN)
    if [ "$HTTPS_STATUS" = "200" ]; then
        print_success "HTTPS website is accessible (HTTPS: $HTTPS_STATUS)"
    else
        print_error "HTTPS website is not accessible (HTTPS: $HTTPS_STATUS)"
        log_message "ERROR: HTTPS website is not accessible (HTTPS: $HTTPS_STATUS)"
    fi
    
    # Check API endpoint
    API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/api)
    if [ "$API_STATUS" = "200" ] || [ "$API_STATUS" = "404" ]; then
        print_success "API endpoint is accessible (API: $API_STATUS)"
    else
        print_error "API endpoint is not accessible (API: $API_STATUS)"
        log_message "ERROR: API endpoint is not accessible (API: $API_STATUS)"
    fi
}

# Check SSL certificate
check_ssl_certificate() {
    print_status "Checking SSL certificate..."
    
    SSL_EXPIRY=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    if [ -n "$SSL_EXPIRY" ]; then
        SSL_DAYS=$(( ($(date -d "$SSL_EXPIRY" +%s) - $(date +%s)) / 86400 ))
        if [ "$SSL_DAYS" -lt 30 ]; then
            print_warning "SSL certificate expires in $SSL_DAYS days"
            log_message "WARNING: SSL certificate expires in $SSL_DAYS days"
        else
            print_success "SSL certificate is valid for $SSL_DAYS days"
        fi
    else
        print_error "Could not check SSL certificate"
        log_message "ERROR: Could not check SSL certificate"
    fi
}

# Check log files
check_log_files() {
    print_status "Checking log files..."
    
    # Check Nginx error log
    if [ -f "/var/log/nginx/$APP_NAME-error.log" ]; then
        ERROR_COUNT=$(tail -n 100 /var/log/nginx/$APP_NAME-error.log | grep -c "error\|ERROR" || true)
        if [ "$ERROR_COUNT" -gt 10 ]; then
            print_warning "High number of Nginx errors in recent logs: $ERROR_COUNT"
            log_message "WARNING: High number of Nginx errors: $ERROR_COUNT"
        else
            print_success "Nginx error log is clean"
        fi
    fi
    
    # Check PM2 logs
    if command -v pm2 &> /dev/null; then
        PM2_ERRORS=$(pm2 logs lumelight-backend --lines 100 --nostream | grep -c "error\|ERROR" || true)
        if [ "$PM2_ERRORS" -gt 5 ]; then
            print_warning "High number of PM2 errors in recent logs: $PM2_ERRORS"
            log_message "WARNING: High number of PM2 errors: $PM2_ERRORS"
        else
            print_success "PM2 error log is clean"
        fi
    fi
}

# Generate system report
generate_report() {
    print_status "Generating system report..."
    
    REPORT_FILE="/var/log/lumelight-system-report-$(date +%Y%m%d-%H%M%S).txt"
    
    {
        echo "Lumelight Interior - System Report"
        echo "Generated: $(date)"
        echo "Server: srv1051246.hstgr.cloud (88.222.241.176)"
        echo "=================================================="
        echo
        
        echo "System Information:"
        echo "-------------------"
        uname -a
        echo "Uptime: $(uptime)"
        echo
        
        echo "Resource Usage:"
        echo "---------------"
        echo "CPU Usage:"
        top -bn1 | grep "Cpu(s)"
        echo
        echo "Memory Usage:"
        free -h
        echo
        echo "Disk Usage:"
        df -h
        echo
        
        echo "Service Status:"
        echo "---------------"
        systemctl status nginx --no-pager -l
        echo
        systemctl status mongod --no-pager -l || systemctl status mongodb --no-pager -l
        echo
        
        if command -v pm2 &> /dev/null; then
            echo "PM2 Status:"
            pm2 list
            echo
        fi
        
        echo "Network Connections:"
        echo "-------------------"
        netstat -tulpn | grep -E ":(80|443|5000|27017)"
        echo
        
    } > $REPORT_FILE
    
    print_success "System report generated: $REPORT_FILE"
}

# Main monitoring function
main() {
    echo "🔍 Lumelight Interior - System Monitoring"
    echo "📍 Server: srv1051246.hstgr.cloud (88.222.241.176)"
    echo "🕐 Time: $(date)"
    echo "=================================================="
    
    check_system_resources
    echo
    check_application_status
    echo
    check_website_accessibility
    echo
    check_ssl_certificate
    echo
    check_log_files
    echo
    
    # Generate report if requested
    if [ "$1" = "--report" ]; then
        generate_report
    fi
    
    echo "=================================================="
    print_success "Monitoring completed!"
}

# Run main function
main "$@"
