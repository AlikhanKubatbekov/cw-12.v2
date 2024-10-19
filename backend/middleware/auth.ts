import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../types';
import User from '../models/User';

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({ error: 'No token provided!' });
  }

  const [, token] = headerValue.split(' ');

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(403).send({ error: 'Wrong token!' });
  }

  req.user = user;
  next();
};

export default auth;
