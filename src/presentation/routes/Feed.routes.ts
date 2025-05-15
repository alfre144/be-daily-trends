import { Router } from 'express';
import { CreateFeedUseCase } from '../../application/use-cases/CreateFeed';
import { FeedRepositoryImpl } from '../../infrastracture/repositories/FeedRepositoryImpl';
import { asyncWrapper } from '../../utils/async-wrapper';
import FeedController from '../controllers/Feed.controller';

const feedRepository = new FeedRepositoryImpl();
const createFeedUseCase = new CreateFeedUseCase(feedRepository);
const feedController = new FeedController(createFeedUseCase);

const router = Router();

router.post('/', asyncWrapper(feedController.create.bind(feedController)));

router.get('/:id', FeedController.getById);

router.get('/', FeedController.getAll);

router.put('/:id', FeedController.update);

router.delete('/:id', FeedController.delete);

export default router;