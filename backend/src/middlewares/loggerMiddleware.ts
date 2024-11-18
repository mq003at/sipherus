import { Request, Response, NextFunction } from 'express';

// Remember to fix this part on Youtube. Broken.
/**
 * Middleware to log details of incoming requests.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next middleware function.
 */
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${url}`);

    // Call the next middleware or route handler
    next();
};

export default loggerMiddleware;
