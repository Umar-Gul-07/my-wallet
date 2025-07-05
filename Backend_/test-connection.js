import fetch from 'node-fetch';

const BASE_URL = 'https://kaka-wallet-backend-production.up.railway.app';

async function testBackend() {
  console.log('🧪 Testing Railway Backend Connection...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint (/)...');
    const rootResponse = await fetch(`${BASE_URL}/`);
    const rootData = await rootResponse.json();
    console.log(`   Status: ${rootResponse.status}`);
    console.log(`   Response:`, rootData);
    console.log('');

    // Test 2: Health endpoint
    console.log('2. Testing health endpoint (/api/health)...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Response:`, healthData);
    console.log('');

    // Test 3: Admin registration endpoint
    console.log('3. Testing admin registration (/api/users/admin)...');
    const adminResponse = await fetch(`${BASE_URL}/api/users/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Admin',
        email: 'test@example.com',
        password: '123456'
      })
    });
    const adminData = await adminResponse.json();
    console.log(`   Status: ${adminResponse.status}`);
    console.log(`   Response:`, adminData);
    console.log('');

    console.log('✅ All tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBackend(); 