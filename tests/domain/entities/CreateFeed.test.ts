import { CreateFeedDto } from '../../../src/application/dtos/CreateFeed.dto';
import { describe, it, expect } from '@jest/globals';
import { validate } from 'class-validator';

describe('Create Feed Validation', () => {
  
    it('should create a valid Feed instance', async () => {
        const dto = new CreateFeedDto();
        Object.assign(dto, {
            source: 'El Mundo',
            url: 'https://www.elmundo.es/',
            title: 'Sample title',
            content: 'This is sample content. And a little bit more of content.',
            author: 'Alfredo Blasco',
        });
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when fields are empty', async () => {
        const dto = new CreateFeedDto();
        Object.assign(dto, {
            source: '',
            url: '',
            title: '',
            content: '',
            author: '',
        });
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors.map(err => err.property))
            .toEqual(['source','url', 'title', 'content', 'author']);
    });


});