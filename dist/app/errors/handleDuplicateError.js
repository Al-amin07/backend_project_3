"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const duplicateText = err === null || err === void 0 ? void 0 : err.message.match(/"([^"]+)"/);
    const text = duplicateText && duplicateText[1];
    const errorSources = [
        {
            path: '',
            message: `${text} is already exist`,
        },
    ];
    return {
        statusCode: 400,
        message: `Duplicate ${text}`,
        errorSources,
    };
};
exports.default = handleDuplicateError;
