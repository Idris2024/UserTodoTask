import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
  error?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    req.error = "There was bad token error. "
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  const jwt_secret = 'ascret';

  try {
    const decoded = jwt.verify(token, 'jwt_secret');
    req.user = (decoded as any).user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;