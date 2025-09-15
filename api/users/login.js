export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // SIMPLE LOGIN - FOR TESTING
  if (email === 'admin@test.com' && password === '123456') {
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@test.com',
          isAdmin: true
        },
        token: 'test-token-123'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
}
