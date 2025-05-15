export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidIdError extends CustomError {
    constructor(message: string = 'Invalid ID format') {
        super(message, 400);
    }
}

export class DatabaseError extends CustomError {
    constructor(message: string) {
        super(message, 500);
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}