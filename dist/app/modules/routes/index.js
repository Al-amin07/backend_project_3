"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultRoute = void 0;
const express_1 = require("express");
const auth_route_1 = require("../auth/auth.route");
const blog_route_1 = require("../blog/blog.route");
const admin_route_1 = require("../admin/admin.route");
const route = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoute,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoute,
    },
];
moduleRoutes.map((el) => route.use(el.path, el.route));
exports.DefaultRoute = route;
