"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const errorSources = Object.values(err === null || err === void 0 ? void 0 : err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    return {
        statusCode: 400,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleValidationError;
