"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        content: zod_1.z.string({ required_error: 'Content is required' }),
        iPublished: zod_1.z.boolean().default(true),
    }),
});
const updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        content: zod_1.z.string({ required_error: 'Content is required' }).optional(),
        iPublished: zod_1.z.boolean().default(true).optional(),
    }),
});
exports.BlogValidation = {
    createBlogSchema,
    updateBlogSchema,
};
