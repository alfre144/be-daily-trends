import feedRoutes from './routes/Feed.routes';
import { errorMiddleware } from './middlewares/errors';
import express, { Application } from 'express';

export class ExpressServer {
    
    private app: Application;
    private port: number;
    private feedsBasePath: string = '/api/feeds';

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    private setupRoutes(): void {
        console.log(`Registering routes at ${this.feedsBasePath}`);
        this.app.use(this.feedsBasePath, feedRoutes); 
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
    }

    private setupErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

}