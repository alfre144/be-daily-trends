import { Feed } from '../../../src/domain/entities/Feed';
import { describe, it, expect } from '@jest/globals';

describe('Feed Entity', () => {
  
    it('should create a valid Feed instance', () => {
        const feedData = {
            source: 'El Mundo',
            url: 'https://www.elmundo.es/',
            title: 'Sample title',
            content: 'This is sample content. And a little bit more of content.',
            author: 'Alfredo Blasco',
        };
        const feed = Feed.create(feedData);
        expect(feed).toBeInstanceOf(Feed);
        expect(feed.source).toBe('El Mundo');
        expect(feed.url).toBe('https://www.elmundo.es/');
        expect(feed.title).toBe('Sample title');
        expect(feed.content).toBe('This is sample content. And a little bit more of content.');
        expect(feed.author).toBe('Alfredo Blasco');

    });
});