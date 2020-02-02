import { Router } from 'express';
import { CommentController } from './Comment.controller';

const router = Router();
const controller = new CommentController();

router.get('/', controller.getCommentsForPost);
router.post('/', controller.createComment);

router.get('/isAlive', (req, res) => res.status(201).end());

export default router;
