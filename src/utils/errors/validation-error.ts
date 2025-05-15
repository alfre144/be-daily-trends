export class ValidationError extends Error {
    public readonly statusCode: number;
    public readonly errors: string[];

    constructor(message: string, errors: string[]) {
        super(message);
        this.statusCode = 400;
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}