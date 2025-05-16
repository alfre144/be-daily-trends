import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError, UnexpectedError } from './errors/custom-errors';


export const validateDTO = async <T extends object>(dtoClass: new () => T, plainObject: object): Promise<T> => {
    try {
        const dtoInstance = plainToInstance(dtoClass, plainObject);
        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            const errorMessages = errors.map(
                err => Object.values(err.constraints || {}).join(', '));
            throw new ValidationError('Validation failed', errorMessages);
        }
        return dtoInstance;
    } catch (error) {
        if (error instanceof ValidationError) 
            throw error;
        throw new UnexpectedError('Unexpected error during DTO validation');
    }
    
};