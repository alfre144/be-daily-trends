import axios from 'axios';
import { Feed } from '../../domain/entities/Feed';
import { ScraperError, UnexpectedError } from '../../utils/errors/custom-errors';

export abstract class BaseScraper {

    protected abstract source: string;
    protected abstract url: string;
    protected maxNews: number;

    constructor(maxNews: number) {
        this.maxNews = maxNews;
    }

    abstract scrape(): Promise<Feed[]>;

    protected async getHTML(url: string): Promise<string> {
        try {
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
            });
            if (response.status !== 200)
                throw new ScraperError(`Error scraping website. Error: ${response.status}`, 500);
            return response.data
        } catch (error) {
            console.error('Error fetching the page:', error);
            if (error instanceof ScraperError) {
                throw error;
            }
            throw new UnexpectedError('An unexpected error occurred while scraping the page');
        }

    }


}