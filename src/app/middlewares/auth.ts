import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../modules/errors/AppError';
import { TRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';
import { Blog } from '../modules/blog/blog.model';

import { NextFunction, Request, Response } from 'express';

const auth = (...roles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(405, 'UnAuthorize access!!!');
    }
    const bearer = jwt.verify(
      token,
      config.access_token as string,
    ) as JwtPayload;

    if (!roles.includes(bearer?.role)) {
      throw new AppError(405, 'Unauthorize access!!!');
    }
    const isUserExist = await User.isUserExist(bearer?.email);

    if (isUserExist.isBlocked) {
      throw new AppError(405, 'This person is blocked');
    }
    req.user = bearer;
    next();
  });
};

const findAuthorId = async (email: string) => {
  const result = await User.findOne({ email }).lean();
  return result?._id;
};

export const updateOrDeleteAuth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user;
    const { id } = req.params;
    const isBlogExist = await Blog.findById(id);
    if (!isBlogExist) {
      throw new AppError(404, 'Blog not found');
    }
    const authorId = await findAuthorId(email);
    const isAuthorUpdatingHisBlog = isBlogExist.author.equals(authorId);
    if (!isAuthorUpdatingHisBlog) {
      throw new AppError(404, 'You do not created this blog');
    }
    next();
  });
};

export default auth;
