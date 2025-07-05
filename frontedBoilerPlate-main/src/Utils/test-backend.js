// Test script to check Railway backend connection from frontend
const testBackendConnection = async () => {
  console.log('🧪 Testing Railway Backend from Frontend...\n');

  try {
    // Test 1: Health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('https://kaka-wallet-backend-production.up.railway.app/api/health');
    const healthData = await healthResponse.json();
    console.log('Health Status:', healthResponse.status);
    console.log('Health Data:', healthData);
    console.log('');

    // Test 2: Login endpoint
    console.log('2. Testing login endpoint...');
    const loginResponse = await fetch('https://kaka-wallet-backend-production.up.railway.app/api/users/login', {
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
    console.log('Login Status:', loginResponse.status);
    console.log('Login Data:', loginData);
    console.log('');

    // Test 3: Admin registration
    console.log('3. Testing admin registration...');
    const adminResponse = await fetch('https://kaka-wallet-backend-production.up.railway.app/api/users/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Frontend Test Admin',
        email: 'frontend@test.com',
        password: '123456'
      })
    });
    const adminData = await adminResponse.json();
    console.log('Admin Registration Status:', adminResponse.status);
    console.log('Admin Registration Data:', adminData);
    console.log('');

    console.log('✅ All frontend tests completed!');
  } catch (error) {
    console.error('❌ Frontend test failed:', error.message);
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  window.testBackendConnection = testBackendConnection;
}

export default testBackendConnection; 