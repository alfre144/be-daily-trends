import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateFeedDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsUrl()
    url?: string;

    @IsOptional()
    @IsString()
    author?: string;
}