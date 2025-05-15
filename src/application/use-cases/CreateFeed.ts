import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { FeedProps } from "../../domain/entities/Feed";
import { CreateFeedDto } from "../dtos/CreateFeed.dto";
import { validateDTO } from "../../utils/validate-dto";

export class CreateFeedUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(feed: FeedProps) {
        try {
            const validatedFeed = await this.validateFeed(feed);
            return await this.feedRepository.create(validatedFeed);
        } catch (error) {
            if(error instanceof Error)
                throw error;
            throw new Error("An unexpected error occurred while creating the feed.");
        } 
    }

    private async validateFeed(feed: FeedProps): Promise<CreateFeedDto> {
        return await validateDTO(CreateFeedDto, feed);
    }
}