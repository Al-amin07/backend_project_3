"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const auth_1 = __importStar(require("../../middlewares/auth"));
const route = (0, express_1.Router)();
route.get('/', blog_controller_1.BlogControllers.getAllBlog);
route.get('/:id', blog_controller_1.BlogControllers.getSingleBlog);
route.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogSchema), blog_controller_1.BlogControllers.createBlog);
route.patch('/:id', (0, auth_1.default)('user'), (0, auth_1.updateOrDeleteAuth)(), (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogSchema), blog_controller_1.BlogControllers.updateBlog);
route.delete('/:id', (0, auth_1.default)('user'), (0, auth_1.updateOrDeleteAuth)(), blog_controller_1.BlogControllers.deleteBlog);
route.get('/');
exports.BlogRoute = route;
