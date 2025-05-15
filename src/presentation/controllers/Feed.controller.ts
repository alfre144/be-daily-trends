import { Request, Response, NextFunction } from 'express';
import { ResponseService } from "../../utils/response-service";

import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { UpdateFeedUseCase } from '../../application/use-cases/UpdateFeed';
import { ListFeedsUseCase } from '../../application/use-cases/ListFeeds';
import { GetFeedByIdUseCase } from '../../application/use-cases/GetFeedById';

class FeedController {

    constructor(
        private readonly createFeedUseCase: CreateFeedUseCase,
        private readonly updateFeedUseCase: UpdateFeedUseCase,
        private readonly listFeedsUseCase: ListFeedsUseCase,
        private readonly getFeedByIdUseCase: GetFeedByIdUseCase,
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

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const feedId = req.params.id;
            const feed = await this.getFeedByIdUseCase.execute(feedId);
            const response = ResponseService.success('Feed retrieved successfully', feed);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        } 
    }
    
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const feeds = await this.listFeedsUseCase.execute();
            const response = ResponseService.success("Feeds retrieved successfully", feeds);
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const feedId = req.params.id;
            const feedData = req.body;
            const updatedFeed = await this.updateFeedUseCase.execute(feedId, feedData);
            const response = ResponseService.success("Feed updated successfully", updatedFeed);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }

    }

    static async delete(req: Request, res: Response): Promise<void> {
        // TODO:
    }
    
}

export default FeedController;