import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await AdminServices.blockUserFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'User is Blocked successfully',
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: 'Users retrived successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: null,
    message: 'Blog deleted successfully',
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
  getAllUser,
};
