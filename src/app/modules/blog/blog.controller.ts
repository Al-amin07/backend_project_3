import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { BlogServices } from './blog.service';

const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Blogs retrived successfully',
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogsFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Blog retrived successfully',
  });
});

const createBlog = catchAsync(async (req, res) => {
  const payload = req.body;
  const { email } = req.user;
  const existUser = await User.isUserExist(email);
  const newBlog: TBlog = {
    ...payload,
    author: existUser?._id,
  };
  const result = await BlogServices.createBlogIntoDB(newBlog);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: 'Blog created successfully',
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const payload = req.body;

  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: 'Blog updated successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: 'Blog deleted successfully',
  });
});

export const BlogControllers = {
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
};
