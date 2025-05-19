import { Request, Response, NextFunction } from 'express';
import { ResponseService } from "../../utils/response-service";

import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { UpdateFeedUseCase } from '../../application/use-cases/UpdateFeed';
import { ListFeedsUseCase } from '../../application/use-cases/ListFeeds';
import { GetFeedByIdUseCase } from '../../application/use-cases/GetFeedById';
import { DeleteFeedUseCase } from '../../application/use-cases/DeleteFeed';
import { ImportFeeds } from '../../application/use-cases/ImportFeeds';

class FeedController {

    constructor(
        private readonly createFeedUseCase: CreateFeedUseCase,
        private readonly updateFeedUseCase: UpdateFeedUseCase,
        private readonly listFeedsUseCase: ListFeedsUseCase,
        private readonly getFeedByIdUseCase: GetFeedByIdUseCase,
        private readonly deleteFeedUseCase: DeleteFeedUseCase,
        private readonly importFeedsUseCase: ImportFeeds
    ) {}

    /***
     * Create a new feed.
     * @param { Request } req - Request object containing the feed data in the body.
     * @param { Response } res - Response object to return the created feed.
     * @param { NextFunction } next - Function to handle errors.
     */
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

    /***
     * Import feeds from an external source.
     * @param { Response } res - Response object to return the imported feeds.
     * @param { NextFunction } next - Function to handle errors.
     */
    async import(res: Response, next: NextFunction): Promise<void> {
        try {
            const feed = await this.importFeedsUseCase.execute();
            const response = ResponseService.success('Feeds imported successfully', feed);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    /***
     * Get a feed by ID.
     * @param { Request } req - Request object containing the feed ID in the parameters.
     * @param { Response } res - Response object to return the requested feed.
     * @param { NextFunction } next - Function to handle errors.
     */
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
    
    /***
     * Get all feeds with optional filters.
     * @param { Request } req - Request object containing query parameters for filtering.
     * @param { Response } res - Response object to return the filtered feeds.
     * @param { NextFunction } next - Function to handle errors.
     */
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { sources, date, limit, page, pageSize, orderBy, orderDirection} = req.query;
            const filters = {
                sources: sources ? (sources as string).split(',') : undefined,
                date: date ? new Date(date as string) : undefined,
                limit: limit ? parseInt(limit as string, 10) : undefined,
                page: page ? parseInt(page as string, 10) : undefined,
                pageSize: pageSize ? parseInt(pageSize as string, 10) : undefined,
                orderBy: orderBy ? (orderBy as string) : undefined,
                orderDirection: orderDirection === 'asc' ? 1 : orderDirection === 'desc' ? -1 : undefined,
            };
            const feeds = await this.listFeedsUseCase.execute(filters);
            const response = ResponseService.success('Feeds retrieved successfully', feeds);
            res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }

    /***
     * Update a feed by ID.
     * @param { Request } req - Request object containging the feed ID in the parameters and data in the body.
     * @param { Response } res - Response object to confirm the update feed.
     * @param { NextFunction } next - Function to handle errors.
     */
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const feedId = req.params.id;
            const feedData = req.body;
            const updatedFeed = await this.updateFeedUseCase.execute(feedId, feedData);
            const response = ResponseService.success('Feed updated successfully', updatedFeed);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }

    }
    /***
     * Delete feed by ID.
     * @param { Request } req - Request object containing the feed ID in the parameters.
     * @param { Response } res - Response object to confirm the deletion.
     * @param { NextFunction } next - Function to handle errors.
     */
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const feedId = req.params.id;
            await this.deleteFeedUseCase.execute(feedId);
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    }
    
}

export default FeedController;