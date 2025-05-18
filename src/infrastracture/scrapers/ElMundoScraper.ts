import { BaseScraper } from './BaseScraper';
import { Feed } from '../../domain/entities/Feed';
import { load } from 'cheerio';

export class ElMundoScraper extends BaseScraper {

    protected source = 'El Mundo';
    protected url = 'https://www.elmundo.es';

    constructor(maxNews: number) {
        super(maxNews);
    }

    async scrape(): Promise<Feed[]> {
        
        const feeds: Feed[] = [];
        const response = await this.getHTML(this.url);
        const $ = load(response);

       $('div[data-b-name="headlines_a"] article').each((index, element) => {
        if (index < this.maxNews) { 
            feeds.push(
                Feed.create({
                    source: this.source,
                    url:$(element).find("a.ue-c-cover-content__link").attr("href") || "N/A",
                    title: $(element).find("span.ue-c-cover-content__kicker").text().trim() || "N/A",
                    content: $(element).find("h2.ue-c-cover-content__headline").text().trim() || "N/A",
                    author: this.cleanAuthor($(element).find(".ue-c-cover-content__byline-name").text().trim()) || "N/A",
                    weight: index + 1,
                })
            );
        }});
        
        return feeds;
    }

    private cleanAuthor = (author: string) => {
        return author.replace(/^Redacci\ufffdn: \s*/i, '').trim();
    };


}