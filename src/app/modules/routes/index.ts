import { Router } from 'express';
import { AuthRoute } from '../auth/auth.route';
import { BlogRoute } from '../blog/blog.route';
import { AdminRoute } from '../admin/admin.route';

const route = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/blogs',
    route: BlogRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
];

moduleRoutes.map((el) => route.use(el.path, el.route));

export const DefaultRoute = route;
