import { IFeedRepository } from '../../domain/repositories/FeedRepository';
import { Feed } from '../../domain/entities/Feed';
import { ScraperFactory } from '../../infrastracture/scrapers/ScraperFactory';
import { scraperConfig } from '../../config/scraper';
import { UnexpectedError } from '../../utils/errors/custom-errors';

export class ImportFeeds {

    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(): Promise<void> {
        try {
            const feeds: Feed[] = [];
            for (const name of scraperConfig.scraperNames) {
                const scraper = ScraperFactory.createScraper(name, scraperConfig.maxNews);
                const scrapedFeeds = await scraper.scrape();
                feeds.push(...scrapedFeeds);
            }
            if (feeds.length > 0) await this.feedRepository.createMany(feeds);
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Unexpected error while importing the scraped feeds.');
        } 
    }

}