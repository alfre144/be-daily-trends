import { BaseScraper } from './BaseScraper';
import { Feed } from '../../domain/entities/Feed';
import { load } from 'cheerio';

export class ElPaisScraper extends BaseScraper {

    protected source = 'El Pais';
    protected url = 'https://www.elpais.com';

    constructor(maxNews: number) {
        super(maxNews);
    }

    async scrape(): Promise<Feed[]> {
        const feeds: Feed[] = [];
        const response = await this.getHTML(this.url);
        const $ = load(response);

       $('section[data-dtm-region="portada_apertura"] article').each((index, element) => {
        if (index < this.maxNews) { 
            feeds.push(
                Feed.create({
                    source: this.source,
                    url: $(element).find("h2.c_t a").attr("href") || 'N/A',
                    title: $(element).find("h2.c_t a").text().trim() || 'N/A',
                    content: $(element).find("p.c_d").text().trim() || 'N/A',
                    author: $(element).find(".c_a_a").text().trim() || 'N/A',
                    weight: index + 1,
                })
            );
        }});
        return feeds;
    }

}