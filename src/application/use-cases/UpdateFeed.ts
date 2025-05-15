import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { FeedProps } from "../../domain/entities/Feed";
import { UpdateFeedDto } from "../dtos/UpdateFeed.dto";
import { validateDTO } from "../../utils/validate-dto";
import { NotFoundError } from "../../utils/errors/custom-errors";
import { UnexpectedError } from "../../utils/errors/unexpected-error";

export class UpdateFeedUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(id: string, feed: Partial<FeedProps>) {
        try {
            const validatedFeed = await this.validateFeed(feed);
            const existingFeed = await this.feedRepository.findById(id);
            if(!existingFeed)
                throw new NotFoundError(`Feed with ID ${id} not found`);
            return await this.feedRepository.update(id, validatedFeed);
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Error while updating the feed.');
        } 
    }

    private async validateFeed(feed: Partial<FeedProps>): Promise<UpdateFeedDto> {
        return await validateDTO(UpdateFeedDto, feed);
    }
}