"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.enum(['admin', 'user']).default('user'),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
