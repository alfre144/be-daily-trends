import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from '../../utils/validation-error';

export const errorMiddleware: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
        });
        return;
    }

    res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        error: err.message,
    });
};