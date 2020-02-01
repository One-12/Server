import { Router } from 'express';
import { PostController } from './post.controller';

const router = Router();
const controller = new PostController();

router.get('/', controller.getPosts);
router.put('/', controller.getPostsByIds);

router.post('/', controller.createNewPost);
router.get('/isAlive', (req, res) => res.status(201).end());

export default router;
