import express, {
    Application,
    Request,
    Response,
    NextFunction,
} from 'express';

export class ExpressServer {
    
    private app: Application;
    private port: number;

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
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Base route response'); 
        });
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