export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('Health check called:', req.method, req.url);

  res.status(200).json({
    success: true,
    message: 'KakaWallet API is running on Vercel - FIXED VERSION',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    version: '2.0'
  });
}
