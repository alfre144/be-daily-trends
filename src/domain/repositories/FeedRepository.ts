import { FeedProps } from '../entities/Feed';

export interface IFeedRepository {
    findById(id: string): Promise<FeedProps | null>;
    findAll(): Promise<FeedProps[]>;
    create(feed: FeedProps): Promise<FeedProps>;
    createMany(feeds: FeedProps[]): Promise<FeedProps[]>;
    update(id: string, feed: Partial<FeedProps>): Promise<FeedProps | null>;
    delete(id: string): Promise<void>;
} 