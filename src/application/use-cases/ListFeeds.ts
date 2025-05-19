import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { UnexpectedError } from "../../utils/errors/custom-errors";
import { FindAllParams } from "../../domain/repositories/FeedRepository";

export class ListFeedsUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(params: FindAllParams) {
        try {
            return await this.feedRepository.findAll(params);
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Unexpected error while creating the feed.');
        } 
    }
}