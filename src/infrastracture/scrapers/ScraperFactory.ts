import { BaseScraper  } from './BaseScraper';
import { ElPaisScraper } from './ElPaisScraper';
import { ElMundoScraper } from './ElMundoScraper';
import { ScraperNotFoundError } from '../../utils/errors/custom-errors';

export class ScraperFactory {
    static createScraper(name: string, maxNews: number): BaseScraper {
        switch (name) {
            case 'elpais':
                return new ElPaisScraper(maxNews);
            case 'elmundo':
                return new ElMundoScraper(maxNews);
            default:
                throw new ScraperNotFoundError(`Scraper not found for name: ${name}`);
        }
    }
}