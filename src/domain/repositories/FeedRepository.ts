import { FeedProps } from '../entities/Feed';

export interface FindAllParams {
    sources?: string[];
    date?: Date;
    limit?: number;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    orderDirection?: number;
}

export interface IFeedRepository {
    findById(id: string): Promise<FeedProps | null>;
    findAll(params: FindAllParams): Promise<FeedProps[]>;
    create(feed: FeedProps): Promise<FeedProps>;
    createMany(feeds: FeedProps[]): Promise<FeedProps[]>;
    update(id: string, feed: Partial<FeedProps>): Promise<FeedProps | null>;
    delete(id: string): Promise<void>;
} 