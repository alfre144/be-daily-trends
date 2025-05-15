import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { UnexpectedError } from "../../utils/errors/unexpected-error";

export class ListFeedsUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute() {
        try {
            return await this.feedRepository.findAll();
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Unexpected error while creating the feed.');
        } 
    }
}
