import feedRoutes from './routes/Feed.routes';
import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';

export class ExpressServer {
    
    private app: Application;
    private port: number;
    private feedsBasePath: string = '/api/feeds';

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.setupRoutes();
        this.setupErrorHandling();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    private setupRoutes(): void {
        this.app.use(this.feedsBasePath, feedRoutes); 
    }

    private setupErrorHandling(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message,
            });
        });
    }

}