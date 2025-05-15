import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFeedDto {
    @IsNotEmpty()
    @IsString()
    source: string;

    @IsNotEmpty()
    @IsUrl()
    url: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    constructor(source: string, url: string, title: string, content: string, author: string) {
        this.source = source;
        this.url = url;
        this.title = title;
        this.content = content;
        this.author = author;
    }
}