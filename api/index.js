export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('Root API called:', req.method, req.url);

  res.status(200).json({
    success: true,
    message: 'Welcome to KakaWallet API on Vercel!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      login: '/api/users/login',
      admin: '/api/users/admin'
    }
  });
}
