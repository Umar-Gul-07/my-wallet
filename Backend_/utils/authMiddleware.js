import User from '../models/User.js';

export const adminAuth = async (req, res, next) => {
  const adminId = req.header('x-admin-id');
  console.log('🔐 adminAuth: x-admin-id header =', adminId);
  if (!adminId) {
    return res.status(401).json({ success: false, message: 'No adminId provided in header' });
  }
  const user = await User.findOne({ where: { id: adminId } });
  if (!user) {
    console.log('🔐 adminAuth: No user found for id', adminId);
    return res.status(401).json({ success: false, message: 'Invalid adminId: user not found' });
  }
  if (!user.isAdmin) {
    console.log('🔐 adminAuth: User found but isAdmin is false for id', adminId);
    return res.status(403).json({ success: false, message: 'User is not an admin. Please log in as an admin.' });
  }
  req.user = user;
  next();
}; 