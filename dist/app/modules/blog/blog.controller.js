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
exports.BlogControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_model_1 = require("../user/user.model");
const blog_service_1 = require("./blog.service");
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getAllBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: 'Blogs retrived successfully',
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.BlogServices.getSingleBlogsFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: 'Blog retrived successfully',
    });
}));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { email } = req.user;
    const existUser = yield user_model_1.User.isUserExist(email);
    const newBlog = Object.assign(Object.assign({}, payload), { author: existUser === null || existUser === void 0 ? void 0 : existUser._id });
    const result = yield blog_service_1.BlogServices.createBlogIntoDB(newBlog);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'Blog created successfully',
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const result = yield blog_service_1.BlogServices.updateBlogIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'Blog updated successfully',
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.BlogServices.deleteBlogFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: 'Blog deleted successfully',
    });
}));
exports.BlogControllers = {
    createBlog,
    updateBlog,
    getAllBlog,
    getSingleBlog,
    deleteBlog,
};
