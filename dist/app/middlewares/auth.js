"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrDeleteAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../modules/errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const blog_model_1 = require("../modules/blog/blog.model");
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(405, 'UnAuthorize access!!!');
        }
        const bearer = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        if (!roles.includes(bearer === null || bearer === void 0 ? void 0 : bearer.role)) {
            throw new AppError_1.default(405, 'Unauthorize access!!!');
        }
        const isUserExist = yield user_model_1.User.isUserExist(bearer === null || bearer === void 0 ? void 0 : bearer.email);
        if (isUserExist.isBlocked) {
            throw new AppError_1.default(405, 'This person is blocked');
        }
        req.user = bearer;
        next();
    }));
};
const findAuthorId = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email }).lean();
    return result === null || result === void 0 ? void 0 : result._id;
});
const updateOrDeleteAuth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.user;
        const { id } = req.params;
        const isBlogExist = yield blog_model_1.Blog.findById(id);
        if (!isBlogExist) {
            throw new AppError_1.default(404, 'Blog not found');
        }
        const authorId = yield findAuthorId(email);
        const isAuthorUpdatingHisBlog = isBlogExist.author.equals(authorId);
        if (!isAuthorUpdatingHisBlog) {
            throw new AppError_1.default(404, 'You do not created this blog');
        }
        next();
    }));
};
exports.updateOrDeleteAuth = updateOrDeleteAuth;
exports.default = auth;
