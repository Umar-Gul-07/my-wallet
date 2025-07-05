import fetch from 'node-fetch';

const BASE_URL = 'https://kaka-wallet-backend-production.up.railway.app';

async function testLogin() {
  console.log('🧪 Testing Login...\n');

  try {
    // Test login with the admin we just created
    console.log('Testing login with test@example.com...');
    const loginResponse = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '123456'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log(`Status: ${loginResponse.status}`);
    console.log('Response:', loginData);
    
    if (loginData.success) {
      console.log('✅ Login successful!');
      console.log('Admin ID:', loginData.data.id);
      console.log('Admin Name:', loginData.data.name);
      console.log('Is Admin:', loginData.data.isAdmin);
    } else {
      console.log('❌ Login failed:', loginData.message);
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testLogin(); 