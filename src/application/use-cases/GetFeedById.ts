import { IFeedRepository } from "../../domain/repositories/FeedRepository";
import { UnexpectedError } from "../../utils/errors/unexpected-error";

export class GetFeedByIdUseCase {
    
    constructor(private readonly feedRepository: IFeedRepository) {}

    async execute(id: string){
        try {
            return await this.feedRepository.findById(id)
        } catch (error) {
            throw error instanceof Error 
                ? error 
                : new UnexpectedError('Unexpected error while creating the feed.');
        } 
    }
}
