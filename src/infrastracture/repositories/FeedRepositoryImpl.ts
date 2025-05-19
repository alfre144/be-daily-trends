import { IFeedRepository, FindAllParams } from '../../domain/repositories/FeedRepository';
import { FeedModel } from '../mongodb/models/FeedModel';
import { Feed, FeedProps } from '../../domain/entities/Feed';
import { DatabaseError, InvalidIdError, NotFoundError } from '../../utils/errors/custom-errors';
import mongoose, { SortOrder } from 'mongoose';

export class FeedRepositoryImpl implements IFeedRepository {

    /***
     * Retieve  a feed by its ID
     * @param { FeedProps } feed - Feed object to be created
     * @returns { Promise<FeedProps> } - Created feed object
     * @throws { DatabaseError } - If there is an error creating the feed
     */
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

    /***
     * Create multiple feeds at once.
     * * @param { FeedProps[] } feeds - Array of feed objects to be created
     * * @returns { Promise<FeedProps[]> } - Array of created feed objects
     * * @throws { DatabaseError } - If there is an error creating the feeds
     */
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

    /***
     * Retrieve a feed by its ID
     * @param { string } id - ID of the feed to be retrieved
     * @returns { Promise<FeedProps> } - Feed object with the specified ID
     * @throws { NotFoundError } - If the feed with the specified ID is not found
     * @throws { InvalidIdError } - If the provided ID is not a valid ObjectId
     * @throws { DatabaseError } - If there is an error retrieving the feed
    */
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

    /*** 
     * Retrieve all feeds with optional filters
     * * @param { FindAllParams } filters - Optional filters for retrieving feeds
     * * @returns { Promise<FeedProps[]> } - Array of feed objects
     * * @throws { DatabaseError } - If there is an error retrieving the feeds
     * * @throws { InvalidIdError } - If the provided ID is not a valid ObjectId
     * * @throws { NotFoundError } - If the feed with the specified ID is not found
     */
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

    /***
     * Update a feed by its ID
     * @param { string } id - ID of the feed to be updated
     * @param { Partial<FeedProps> } feed - Partial feed object with updated properties
     * @returns { Promise<FeedProps> } - Updated feed object
     * @throws { NotFoundError } - If the feed with the specified ID is not found
     * @throws { InvalidIdError } - If the provided ID is not a valid ObjectId
     * @throws { DatabaseError } - If there is an error updating the feed
     */
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

    /***
     * Delete a feed by its ID
     * @param { string } id - ID of the feed to be deleted
     * @returns { Promise<void> } - Promise indicating the deletion status
     * @throws { NotFoundError } - If the feed with the specified ID is not found
     * @throws { InvalidIdError } - If the provided ID is not a valid ObjectId
     * @throws { DatabaseError } - If there is an error deleting the feed
     */
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

    /***
     * Get the start and end of the day for a given date
     * * @param { Date } date - The date to get the startDate and endDate
     * * @returns { { startDate: Date; endDate: Date } } - Object containing startDate and endDate
     */
    private getStartAndEndOfDay(date: Date): { startDate: Date; endDate: Date } {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        return { startDate, endDate };
    }

    /***
     * Validate the orderBy parameter
     * * @param { string | undefined } orderBy - The orderBy parameter to validate
     * * @param { string[] } allowedFields - Array of allowed fields for ordering
     * * @param { string } defaultField - Default field to use if orderBy is not valid
     * * @returns { string } - Validated orderBy field
     */
    private validateOrderBy(orderBy: string | undefined, allowedFields: string[], defaultField: string): string {
        if (orderBy && allowedFields.includes(orderBy))
            return orderBy;
        return defaultField;
    }

}