import { FeedProps } from '../entities/Feed';

export interface IFeedScraper {
    scrape(): Promise<FeedProps[]>;
}