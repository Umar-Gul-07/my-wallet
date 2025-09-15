import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.headers['x-admin-id'];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // For backward compatibility, check if it's a user ID
    if (!isNaN(token)) {
      const user = await User.findByPk(token);
      if (!user || !user.isAdmin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin ID'
        });
      }
      req.user = user;
      return next();
    }

    // JWT token verification
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user || !user.isAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token or user not admin'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};
