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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerNewUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isuserExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (isuserExist) {
        throw new AppError_1.default(400, 'User already exist');
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!isUserExist) {
        throw new AppError_1.default(401, 'User not exist');
    }
    // Check if the passowrd are same or not
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(401, 'Incorrect Password');
    }
    const token = jsonwebtoken_1.default.sign({
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
    }, config_1.default.access_token, { expiresIn: '10d' });
    return token;
});
exports.AuthServices = {
    registerNewUserIntoDB,
    loginUserIntoDB,
};
