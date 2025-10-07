# Password Reset Functionality

This document explains the password reset functionality implemented in the Lumelight Interior backend.

## Overview

The password reset system allows users to reset their passwords via email. It includes two main endpoints:

1. **POST /forgot-password** - Request a password reset
2. **POST /reset-password** - Reset password with token

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```env
# Email Configuration
EMAIL_USER=your_gmail_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:5173

# JWT Secret (if not already set)
JWT_SECRET=your_jwt_secret_key
```

### 2. Gmail App Password Setup

To use Gmail for sending emails:

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS` in your `.env` file

### 3. Install Dependencies

```bash
npm install
```

## API Endpoints

### 1. Request Password Reset

**POST** `/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent successfully"
}
```

**Error Responses:**
- `404` - User not found
- `500` - Internal server error

### 2. Reset Password

**POST** `/reset-password`

**Request Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "new_password"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

**Error Responses:**
- `400` - Invalid or expired reset token
- `500` - Internal server error

## Database Schema Updates

The User model has been updated with additional fields:

```javascript
{
  // ... existing fields
  resetToken: String,        // Token for password reset
  resetTokenExpiry: Date     // Token expiration time
}
```

## Security Features

1. **Token Expiration**: Reset tokens expire after 1 hour
2. **Secure Token Generation**: Uses crypto.randomBytes() for secure token generation
3. **Token Cleanup**: Reset tokens are cleared after successful password reset
4. **Email Validation**: Only sends reset emails to registered users

## Email Template

The password reset email includes:
- Professional HTML formatting
- Clear call-to-action button
- Fallback text link
- Security information
- Branding for Lumelight Interior

## Testing

### Manual Testing

#### Using PowerShell (Windows)

1. **Test Forgot Password:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/forgot-password" -Method POST -ContentType "application/json" -Body '{"email": "lumelightinterior@gmail.com"}'
   ```

2. **Test Reset Password:**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/reset-password" -Method POST -ContentType "application/json" -Body '{"token": "your_token_here", "newPassword": "newpassword123"}'
   ```

#### Using curl (if available)

1. **Test Forgot Password:**
   ```bash
   curl -X POST http://localhost:5000/forgot-password -H "Content-Type: application/json" -d "{\"email\": \"lumelightinterior@gmail.com\"}"
   ```

2. **Test Reset Password:**
   ```bash
   curl -X POST http://localhost:5000/reset-password -H "Content-Type: application/json" -d "{\"token\": \"your_token_here\", \"newPassword\": \"newpassword123\"}"
   ```

#### Using Postman or Thunder Client

1. **Forgot Password Request:**
   - Method: POST
   - URL: `http://localhost:5000/forgot-password`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "email": "lumelightinterior@gmail.com"
     }
     ```

2. **Reset Password Request:**
   - Method: POST
   - URL: `http://localhost:5000/reset-password`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "token": "your_token_from_email",
       "newPassword": "newpassword123"
     }
     ```

### Automated Testing

Run the test script:
```bash
node test-password-reset.js
```

## Frontend Integration

The frontend should implement:

1. **Forgot Password Page** (`/forgot-password`):
   - Email input field
   - Submit button
   - Success/error message display

2. **Reset Password Page** (`/reset-password`):
   - Token extraction from URL parameters
   - New password input fields
   - Confirm password field
   - Submit button

### Example Frontend Implementation

```javascript
// Forgot Password
const handleForgotPassword = async (email) => {
  try {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    // Handle response
  } catch (error) {
    // Handle error
  }
};

// Reset Password
const handleResetPassword = async (token, newPassword) => {
  try {
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await response.json();
    // Handle response
  } catch (error) {
    // Handle error
  }
};
```

## Troubleshooting

### Common Issues

1. **Email not sending:**
   - Check Gmail app password
   - Verify EMAIL_USER and EMAIL_PASS in .env
   - Check Gmail security settings

2. **Token not working:**
   - Ensure token is not expired (1 hour limit)
   - Check if token was already used
   - Verify token format

3. **User not found:**
   - Ensure email exists in database
   - Check email spelling

### Logs

Check server logs for detailed error messages:
```bash
# Look for these log messages:
# - "Error sending password reset email:"
# - "Error resetting password:"
# - "Error verifying token:"
```

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting for forgot-password endpoint
2. **Token Storage**: Reset tokens are stored in database (consider Redis for production)
3. **Email Security**: Use HTTPS for email links in production
4. **Password Requirements**: Implement strong password requirements
5. **Audit Logging**: Log password reset attempts for security monitoring

## Production Deployment

For production deployment:

1. Use a dedicated email service (SendGrid, AWS SES, etc.)
2. Implement rate limiting
3. Use Redis for token storage
4. Add comprehensive logging
5. Implement monitoring and alerting
6. Use HTTPS for all communications
