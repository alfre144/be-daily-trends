import { Router } from 'express';
import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { UpdateFeedUseCase } from '../../application/use-cases/UpdateFeed';
import { FeedRepositoryImpl } from '../../infrastracture/repositories/FeedRepositoryImpl';
import { asyncWrapper } from '../../utils/async-wrapper';
import FeedController from '../controllers/Feed.controller';

const feedRepository = new FeedRepositoryImpl();
const createFeedUseCase = new CreateFeedUseCase(feedRepository);
const updateFeedUseCase = new UpdateFeedUseCase(feedRepository);
const feedController = new FeedController(createFeedUseCase, updateFeedUseCase);

const router = Router();

router.post('/', asyncWrapper(feedController.create.bind(feedController)));

router.get('/:id', FeedController.getById);

router.get('/', FeedController.getAll);

router.put('/:id', asyncWrapper(feedController.update.bind(feedController)));

router.delete('/:id', FeedController.delete);

export default router;