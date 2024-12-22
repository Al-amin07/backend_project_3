import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../errors/AppError';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  const blogResult = await Blog.findById(result?._id)
    .populate('author')
    .select('_id title content author');
  return blogResult;
};

const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(405, 'Blog not found!!!');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  })
    .populate('author')
    .select('_id title content author');
  return result;
};
const deleteBlogFromDB = async (id: string) => {
  // const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  await Blog.findByIdAndDelete(id);
  return await Blog.findById(id);
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
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
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author').select('_id title content author'),
    query,
  )
    .search(['title', 'content'])
    .sort()
    .filter();
  const result = await blogQuery.modelQuery;
  return result;
};
const getSingleBlogsFromDB = async (id: string) => {
  const result = await Blog.findById(id)
    .populate('author')
    .select('_id title content author');
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogsFromDB,
  deleteBlogFromDB,
};
