import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from './validation-error';


export const validateDTO = async <T extends object>(dtoClass: new () => T, plainObject: object): Promise<T> => {
    
    const dtoInstance = plainToInstance(dtoClass, plainObject);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
        const errorMessages = errors.map(
            err => Object.values(err.constraints || {}).join(', '));
        throw new ValidationError('Validation failed', errorMessages);
    }

    return dtoInstance;
};