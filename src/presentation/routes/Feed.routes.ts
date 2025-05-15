import FeedController from '../controllers/Feed.controller';
import { Router } from 'express';
import { FeedRepositoryImpl } from '../../infrastracture/repositories/FeedRepositoryImpl';
import { asyncWrapper } from '../../utils/async-wrapper';
// UseCases
import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { UpdateFeedUseCase } from '../../application/use-cases/UpdateFeed';
import { ListFeedsUseCase } from '../../application/use-cases/ListFeeds';
import { GetFeedByIdUseCase } from '../../application/use-cases/GetFeedById';

// Feed Repository Implementation
const feedRepository = new FeedRepositoryImpl();
// UseCases
const createFeedUseCase = new CreateFeedUseCase(feedRepository);
const updateFeedUseCase = new UpdateFeedUseCase(feedRepository);
const listFeedsUseCase = new ListFeedsUseCase(feedRepository);
const getFeedByIdUseCase = new GetFeedByIdUseCase(feedRepository);

const feedController = new FeedController(
    createFeedUseCase, 
    updateFeedUseCase,
    listFeedsUseCase,
    getFeedByIdUseCase,
);

const router = Router();

router.post('/', asyncWrapper(feedController.create.bind(feedController)));

router.get('/:id', asyncWrapper(feedController.getById.bind(feedController)));

router.get('/', asyncWrapper(feedController.getAll.bind(feedController)));

router.put('/:id', asyncWrapper(feedController.update.bind(feedController)));

router.delete('/:id', FeedController.delete);

export default router;