import config from '../../config';
import AppError from '../errors/AppError';
import { User } from '../user/user.model';
import { TLogin, TRegistration } from './auth.interface';
import jwt from 'jsonwebtoken';
const registerNewUserIntoDB = async (payload: TRegistration) => {
  const isuserExist = await User.findOne({ email: payload?.email });
  if (isuserExist) {
    throw new AppError(400, 'User already exist');
  }

  const result = await User.create(payload);
  return result;
};

const loginUserIntoDB = async (payload: TLogin) => {
  const isUserExist = await User.isUserExist(payload?.email);
  if (!isUserExist) {
    throw new AppError(401, 'User not exist');
  }

  // Check if the passowrd are same or not
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(401, 'Incorrect Password');
  }
  const token = jwt.sign(
    {
      role: isUserExist?.role,
      email: isUserExist?.email,
    },
    config.access_token as string,
    { expiresIn: '10d' },
  );
  return token;
};

export const AuthServices = {
  registerNewUserIntoDB,
  loginUserIntoDB,
};
