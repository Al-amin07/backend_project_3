import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true },
  );
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const AdminServices = {
  blockUserFromDB,
  deleteBlogFromDB,
};
