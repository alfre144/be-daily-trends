import { IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class UpdateFeedDto {
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'Source must be at least 3 characters long' })
    title?: string;

    @IsOptional()
    @IsString()
    @MinLength(10, { message: 'Source must be at least 10 characters long' })
    content?: string;

    @IsOptional()
    @IsUrl({}, { message: 'URL must be a valid URL.' })
    url?: string;

    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'Author must be at least 2 characters long' })
    author?: string;
}