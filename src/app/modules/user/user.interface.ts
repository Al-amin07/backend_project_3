import { Model } from 'mongoose';

import { userRole } from './user.constant';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export type TRole = keyof typeof userRole;

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isPasswordMatched(password: string, hashedpassword: string): Promise<boolean>;
  isUserBlocked(email: string): Promise<boolean>;
}
