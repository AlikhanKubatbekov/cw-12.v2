import { HydratedDocument, Model, Schema, Types } from 'mongoose';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}

export interface UserFields {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, object, UserMethods>;

export interface Recipe extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  recipe: string;
  image: string;
}

export interface RecipeMutation {
  user: Types.ObjectId;
  title: string;
  recipe: string;
  image: string;
}
