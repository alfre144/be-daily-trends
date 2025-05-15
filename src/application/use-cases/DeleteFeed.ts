import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { NotFoundError } from "../../utils/errors/custom-errors";
import { UnexpectedError } from "../../utils/errors/unexpected-error";

export class DeleteFeedUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(id: string) {
        try {
            const existingFeed = await this.feedRepository.findById(id);
            if(!existingFeed)
                throw new NotFoundError(`Feed with ID ${id} not found`);
            return await this.feedRepository.delete(id);
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Error while updating the feed.');
        } 
    }

}