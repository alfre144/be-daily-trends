export const scraperConfig = {
    scraperNames: (process.env.SCRAPER_NAMES || 'elpais,elmundo').split(','),
    maxNews: parseInt(process.env.MAX_NEWS || '5', 10),
}