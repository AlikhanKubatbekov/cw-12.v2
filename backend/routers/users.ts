import { Router, NextFunction, Request, Response } from 'express';
import { Error, mongo, Types } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { imagesUpload } from '../multer';
import config from '../config';
import User from '../models/User';

const usersRouter = Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post(
  '/',
  imagesUpload.single('avatar'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
        avatar: req.file ? req.file.filename : null,
        role: req.body.role,
      });

      user.generateToken();

      await user.save();

      return res.status(200).send({ message: 'User successfully created!', user });
    } catch (e) {
      if (e instanceof mongo.MongoServerError && e.code === 11000) {
        return res.status(422).send({ message: 'Email should be unique!' });
      }

      if (e instanceof Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

usersRouter.post('/google', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google login error!' });
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];
    const avatar = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = new User({
        email,
        password: crypto.randomUUID(),
        displayName,
        googleId: id,
        avatar,
      });
    }

    user.generateToken();
    await user.save();

    return res.send({ message: 'Login with Google successful!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/sessions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: 'Email or password is wrong!' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Email or password is wrong!' });
    }

    user.generateToken();

    await user.save();

    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const user = await User.findById(req.params.id).select('avatar displayName');
    return res.status(200).send(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const headerValue = req.get('Authorization');
    const success = { message: 'Successfully logout!' };

    if (!headerValue) return res.send(success);

    const [, token] = headerValue.split(' ');

    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
