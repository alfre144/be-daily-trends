import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../../utils/errors/custom-errors';

export const errorMiddleware: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: err.name,
        });
        return;
    }

    res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        error: err.message,
    });
};