import { Request, Response, NextFunction } from 'express';
import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { ResponseService } from "../../utils/response-service";

class FeedController {

    constructor(
        private readonly createFeedUseCase: CreateFeedUseCase
    ) {}

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { source, url, title, content, author } = req.body;
        try {
            const feed = await this.createFeedUseCase.execute({ source, url, title, content, author });
            const response = ResponseService.success('Feed created successfully', feed);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        // TODO:
    }
    
    static async getAll(req: Request, res: Response): Promise<void> {
        // TODO:
    }

    static async update(req: Request, res: Response): Promise<void> {
        // TODO:
    }

    static async delete(req: Request, res: Response): Promise<void> {
        // TODO:
    }
    
}

export default FeedController;