import { IFeedRepository } from '../../domain/repositories/IFeedRepository';
import { FeedModel } from '../mongodb/models/FeedModel';
import { Feed, FeedProps } from '../../domain/entities/Feed';

export class FeedRepositoryImpl implements IFeedRepository {

    async create(feed: FeedProps): Promise<FeedProps> {
        const createdFeed = await FeedModel.create(feed);
        return createdFeed.toObject();
    }

    async createMany(feeds: FeedProps[]): Promise<FeedProps[]> {
        const createdFeeds = await FeedModel.insertMany(feeds);
        return createdFeeds.map(feed => feed.toObject());
    }

    async findById(id: string): Promise<FeedProps | null> {
        const feed = await FeedModel.findById(id);
        return feed ? feed.toObject() : null;
    }

    async findAll(): Promise<FeedProps[]> {
        const feeds = await FeedModel.find();
        return feeds.map(feed => feed.toObject());
    }

    async update(id: string, feed: Partial<FeedProps>): Promise<FeedProps | null> {
        const updatedFeed = await FeedModel.findByIdAndUpdate(id, feed, { new: true });
        return updatedFeed ? updatedFeed.toObject() : null;
    }

    async delete(id: string): Promise<void> {
        await FeedModel.findByIdAndDelete(id);
    }

}