import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Getting the token from cookies
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREATE); // Verify the token 
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid Token' });
    }

    const user = await User.findById(decoded.id).select("-password"); // feetch the user from DB
    if (!user) {
      return res.status(401).json({ error: 'No user found' });
    }

    req.user = user; // current loggedIn User
    next(); 
  } catch (error) {
    console.error('JWT auth error:', error.message);
    if (!res.headersSent) {
      res.status(401).json({ message: 'Unauthorized access: Invalid or expired token' });
    }
  }
};

export default auth;
