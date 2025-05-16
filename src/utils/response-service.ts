export interface ResponseData<T> {
    status: string;
    message: string;
    data?: T;
    timestamp: string;
}

export class ResponseService {
    
    static success<T>(message: string, data?: T): ResponseData<T> {
        return {
            status: 'success',
            message,
            data,
            timestamp: new Date().toISOString(),
        };
    }

    static error(message: string): ResponseData<null> {
        return {
            status: 'error',
            message,
            timestamp: new Date().toISOString(),
        };
    }
}