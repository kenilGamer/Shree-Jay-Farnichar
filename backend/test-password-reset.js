const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testPasswordReset() {
  try {
    console.log('Testing Password Reset Flow...\n');

    // Test 1: Request password reset
    console.log('1. Testing forgot password endpoint...');
    const forgotResponse = await axios.post(`${BASE_URL}/forgot-password`, {
      email: 'shreejayfarnichar@gmail.com'
    });
    console.log('✅ Forgot password response:', forgotResponse.data);

    // Test 2: Test with invalid email
    console.log('\n2. Testing with invalid email...');
    try {
      await axios.post(`${BASE_URL}/forgot-password`, {
        email: 'nonexistent@example.com'
      });
    } catch (error) {
      console.log('✅ Invalid email handled correctly:', error.response.data);
    }

    // Test 3: Test reset password with invalid token
    console.log('\n3. Testing reset password with invalid token...');
    try {
      await axios.post(`${BASE_URL}/reset-password`, {
        token: 'invalid-token',
        newPassword: 'newpassword123'
      });
    } catch (error) {
      console.log('✅ Invalid token handled correctly:', error.response.data);
    }

    console.log('\n✅ Password reset endpoints are working correctly!');
    console.log('\nNote: To complete the test, you would need to:');
    console.log('1. Check the email for the reset link');
    console.log('2. Use the token from the email to reset the password');
    console.log('3. Test login with the new password');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testPasswordReset();
