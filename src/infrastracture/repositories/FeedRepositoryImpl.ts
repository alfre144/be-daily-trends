import { IFeedRepository } from '../../domain/repositories/FeedRepository';
import { FeedModel } from '../mongodb/models/FeedModel';
import { FeedProps } from '../../domain/entities/Feed';
import mongoose from 'mongoose';

export class FeedRepositoryImpl implements IFeedRepository {

    async create(feed: FeedProps): Promise<FeedProps> {
        try {
            const createdFeed = await FeedModel.create(feed);
            return createdFeed.toJSON() as FeedProps;
        } catch (error) {
            if(error instanceof Error)
                throw new Error(`Error creating feed: ${error.message}`);
            throw new Error('Error creating feed: Unknown error');
        }
    }

    async createMany(feeds: FeedProps[]): Promise<FeedProps[]> {
        try {
            const createdFeeds = await FeedModel.insertMany(feeds);
            return createdFeeds.map(feed => feed.toJSON() as FeedProps);
        } catch (error) {
            if(error instanceof Error)
                throw new Error(`Error creating feeds: ${error.message}`);
            throw new Error('Error creating feeds: Unknown error');
        }
    }

    async findById(id: string): Promise<FeedProps | null> {
        if(!mongoose.isValidObjectId(id)) 
            throw new Error('Invalid ID format');
        const feed = await FeedModel.findById(id).lean();
        return feed ? (feed as FeedProps) : null;
    }

    async findAll(): Promise<FeedProps[]> {
        const feeds = await FeedModel.find().lean();
        return feeds as FeedProps[];
    }

    async update(id: string, feed: Partial<FeedProps>): Promise<FeedProps | null> {
        if(!mongoose.isValidObjectId(id)) 
            throw new Error('Invalid ID format');
        const updatedFeed = await FeedModel.findByIdAndUpdate(id, feed, { new: true, lean: true });
        return updatedFeed ? (updatedFeed as FeedProps) : null;
    }

    async delete(id: string): Promise<void> {
        if(!mongoose.isValidObjectId(id)) 
            throw new Error('Invalid ID format');
        await FeedModel.findByIdAndDelete(id);
    }

}