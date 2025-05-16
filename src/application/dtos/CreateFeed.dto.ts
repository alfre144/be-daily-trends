import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFeedDto {
    @IsNotEmpty()
    @IsString()
    source!: string;

    @IsNotEmpty()
    @IsUrl()
    url!: string;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsString()
    author!: string;
}