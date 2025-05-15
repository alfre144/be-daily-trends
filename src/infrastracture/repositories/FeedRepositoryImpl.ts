import { IFeedRepository } from '../../domain/repositories/FeedRepository';
import { FeedModel } from '../mongodb/models/FeedModel';
import { FeedProps } from '../../domain/entities/Feed';
import { DatabaseError, InvalidIdError, NotFoundError } from '../../utils/errors/custom-errors';
import mongoose from 'mongoose';

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
            throw new DatabaseError(
                `Error finding feed by ID: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

    async findAll(): Promise<FeedProps[]> {
        try {
            const feeds = await FeedModel.find().lean();
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
            throw new DatabaseError(
                `Error deleting feed: ${error instanceof Error 
                    ? error.message 
                    : 'Unknown error'
            }`);
        }
    }

}