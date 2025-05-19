import { UpdateFeedDto } from '../../../src/application/dtos/UpdateFeed.dto';
import { validate } from 'class-validator';
import { describe, it, expect } from '@jest/globals';

describe('Update Feed Validation', () => {

    it('should fail when title is shorter than 3 chars', async () => {
        const dto = new UpdateFeedDto();
        dto.title = 'AB';
        const errors = await validate(dto);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints?.minLength).toBe('Source must be at least 3 characters long');
    });

    it('should fail when content is shorter than 10 chars', async () => {
        const dto = new UpdateFeedDto();
        dto.content = 'A1234567';
        const errors = await validate(dto);
        expect(errors.length).toBe(1);
        expect(errors[0].constraints?.minLength).toBe('Source must be at least 10 characters long');
    });

    it('should pass when all fields are valid', async () => {
        const dto = new UpdateFeedDto();
        dto.title = 'Valid AB Title';
        dto.content = 'Valid content with more than 10 characters';
        dto.url = 'https://ablasco.dev/news';
        dto.author = 'Alfredo Blasco';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

});