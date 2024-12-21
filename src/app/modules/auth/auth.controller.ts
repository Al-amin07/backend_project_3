import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  console.log({ payload });
  const result = await AuthServices.registerNewUserIntoDB(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: 'User registered successfully',
  });
});
const loginUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthServices.loginUserIntoDB(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: { token: result },
    message: 'Login successful',
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
};
