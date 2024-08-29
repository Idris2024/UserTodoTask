import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password
    });

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err : any ) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, 'your_jwt_secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err: any ) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};