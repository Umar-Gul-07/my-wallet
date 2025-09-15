export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // SIMPLE GET USERS - FOR TESTING
    res.json({
      success: true,
      data: [
        {
          id: 1,
          name: 'Test User 1',
          email: 'user1@test.com',
          phone: '1234567890',
          totalGiven: 1000,
          totalReturned: 500,
          moneyKeepingBalance: 500,
          isFullyReturned: false
        },
        {
          id: 2,
          name: 'Test User 2',
          email: 'user2@test.com',
          phone: '0987654321',
          totalGiven: 2000,
          totalReturned: 2000,
          moneyKeepingBalance: 0,
          isFullyReturned: true
        }
      ],
      count: 2
    });
  } else if (req.method === 'POST') {
    const { name, email, phone, address, notes } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    // SIMPLE CREATE USER - FOR TESTING
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: Math.floor(Math.random() * 1000),
        name,
        email,
        phone,
        address,
        notes,
        isAdmin: false,
        status: 'active'
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
