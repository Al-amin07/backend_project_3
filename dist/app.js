"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/modules/routes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hello World',
    });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.DefaultRoute);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
