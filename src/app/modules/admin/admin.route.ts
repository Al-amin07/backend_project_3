import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';

const route = Router();

route.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);
route.delete('/blogs/:id', auth('admin'), AdminControllers.deleteBlog);

export const AdminRoute = route;
