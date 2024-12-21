import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const route = Router();

route.post(
  '/register',
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.registerUser,
);
route.post('/login', AuthControllers.loginUser);

export const AuthRoute = route;
