"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Remember to fix this part on Youtube. Broken.
/**
 * Middleware to log details of incoming requests.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 */
const loggerMiddleware = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${url}`);
    // Call the next middleware or route handler
    next();
};
exports.default = loggerMiddleware;
