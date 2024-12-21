"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const route = (0, express_1.Router)();
route.patch('/users/:userId/block', (0, auth_1.default)('admin'), admin_controller_1.AdminControllers.blockUser);
route.delete('/blogs/:id', (0, auth_1.default)('admin'), admin_controller_1.AdminControllers.deleteBlog);
exports.AdminRoute = route;
