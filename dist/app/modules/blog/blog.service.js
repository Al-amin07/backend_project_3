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
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExist = yield blog_model_1.Blog.findById(id);
    if (!isBlogExist) {
        throw new AppError_1.default(405, 'Blog not found!!!');
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
    const result = yield blog_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // const queryObj = { ...query };
    // let search = '';
    // if (query?.search) {
    //   search = query?.search as string;
    // }
    // // Sort By
    // let sortBy = 'createdAt';
    // if (query?.sortBy) {
    //   sortBy = query?.sortBy as string;
    // }
    // let sortOrder = 'asc';
    // if (query?.sortOrder) {
    //   sortOrder = query?.sortOrder as string;
    // }
    // const searchTerm = ['title', 'content'];
    // const searchQuery = Blog.find({
    //   $or: searchTerm.map((el) => ({
    //     [el]: { $regex: search, $options: 'i' },
    //   })),
    // }).populate('author');
    // const sortQuery = searchQuery.sort({
    //   [sortBy]: sortOrder === 'asc' ? 1 : -1,
    // });
    // // Filter Query
    // const romoveAbleFields = ['search', 'sortBy', 'sortOrder', 'filter'];
    // romoveAbleFields.forEach((el) => delete queryObj[el]);
    // if (query?.filter) {
    //   queryObj._id = query?.filter;
    // }
    // const filterQuery = await sortQuery.find(queryObj);
    // return filterQuery
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('author'), query)
        .search(['title', 'content'])
        .sort()
        .filter();
    const result = yield blogQuery.modelQuery;
    return result;
});
const getSingleBlogsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id).populate('author');
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogsFromDB,
    deleteBlogFromDB,
};
