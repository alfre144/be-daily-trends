import { IFeedRepository, FindAllParams } from '../../domain/repositories/FeedRepository';
import { FeedModel } from '../mongodb/models/FeedModel';
import { FeedProps } from '../../domain/entities/Feed';
import { DatabaseError, InvalidIdError, NotFoundError } from '../../utils/errors/custom-errors';
import mongoose, { SortOrder } from 'mongoose';

export class FeedRepositoryImpl implements IFeedRepository {

    async create(feed: FeedProps): Promise<FeedProps> {
        try {
            const createdFeed = await FeedModel.create(feed);
            return createdFeed.toJSON() as FeedProps;
        } catch (error) {
            throw new DatabaseError(
                `Error creating feed: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

    async createMany(feeds: FeedProps[]): Promise<FeedProps[]> {
        try {
            const createdFeeds = await FeedModel.insertMany(feeds);
            return createdFeeds.map(feed => feed.toJSON() as FeedProps);
        } catch (error) {
            throw new DatabaseError(
                `Error creating feeds: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

    async findById(id: string): Promise<FeedProps> {
        if(!mongoose.isValidObjectId(id)) 
            throw new InvalidIdError();
        try {
            const feed = await FeedModel.findById(id);
            if (!feed)
                throw new NotFoundError(`Feed with ID '${id}' not found`);
            return feed.toJSON() as FeedProps;
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof InvalidIdError)
                throw error;
            throw new DatabaseError(
                `Error finding feed by ID: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

    async findAll(filters?: FindAllParams): Promise<FeedProps[]> {
        try {
            const query: any = {};
            if (filters?.sources)
                query.sources   = { $in: filters.sources };
            if (filters?.date) {
                const { startDate, endDate } = this.getStartAndEndOfDay(filters.date);
                query.createdAt = { $gte: startDate, $lte: endDate };
            }
            // Pagination
            const page = filters?.page || 1;
            const pageSize = filters?.pageSize || 15;
            // Ordering
            const allowedOrderByFields = ['createdAt', 'weight'];
            const orderByField = allowedOrderByFields.includes(filters?.orderBy as string)
            ? (filters?.orderBy as string)
            : 'createdAt';
            const orderDirection = filters?.orderDirection ?? -1;
            const sortOrderProps: Record<string, SortOrder> = {
                [orderByField]: orderDirection as SortOrder
            };
            
            const feeds = await FeedModel.find(query)
                .sort(sortOrderProps)
                .skip((page - 1) * pageSize)
                .limit(pageSize);

            return feeds as FeedProps[];
        } catch (error) {
            throw new DatabaseError(
                `Error finding all feeds: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }  
    }

    async update(id: string, feed: Partial<FeedProps>): Promise<FeedProps> {
        if(!mongoose.isValidObjectId(id)) 
            throw new InvalidIdError();
        try {
            const updatedFeed = await FeedModel.findByIdAndUpdate(id, feed, { new: true });
            if (!updatedFeed)
                throw new NotFoundError(`Feed with ID '${id}' not found for update`);
            return updatedFeed.toJSON() as FeedProps;
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof InvalidIdError)
                throw error;
            throw new DatabaseError(
                `Error updating feed: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }

    }

    async delete(id: string): Promise<void> {
        if(!mongoose.isValidObjectId(id)) 
            throw new InvalidIdError();
        try {
            const result = await FeedModel.findByIdAndDelete(id);
            if(!result)
                throw new NotFoundError(`Feed with ID '${id}' not found for deletion`);
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof InvalidIdError)
                throw error;
            throw new DatabaseError(
                `Error deleting feed: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

    private getStartAndEndOfDay(date: Date): { startDate: Date; endDate: Date } {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
    }

    private validateOrderBy(orderBy: string | undefined, allowedFields: string[], defaultField: string): string {
        if (orderBy && allowedFields.includes(orderBy))
            return orderBy;
        return defaultField;
    }

}