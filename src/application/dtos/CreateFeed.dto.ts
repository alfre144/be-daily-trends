import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateFeedDto {
    @IsNotEmpty({ message: 'Source is required' })
    @IsString({ message: 'Source must be a string' })
    @MinLength(3, { message: 'Source must be at least 3 characters long' })
    source!: string;

    @IsNotEmpty({ message: 'URL is required and cannot be empty.' })
    @IsUrl({}, { message: 'URL must be a valid URL.' })
    url!: string;

    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(3, { message: 'Title must be at least 3 characters long' })
    title!: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    content!: string;

    @IsNotEmpty({ message: 'Author is required' })
    @IsString({ message: 'Author must be a string' })
    @MinLength(2, { message: 'Author must be at least 2 characters long' })
    author!: string;
}