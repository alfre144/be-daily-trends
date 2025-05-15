import { Router } from 'express';
import FeedController from '../controllers/Feed.controller';

const router = Router();

router.post('/', FeedController.create);

router.get('/:id', FeedController.getById);

router.get('/', FeedController.getAll);

router.put('/:id', FeedController.update);

router.delete('/:id', FeedController.delete);

export default router;