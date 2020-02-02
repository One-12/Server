import { Router } from 'express';
import { PostController } from './post.controller';

const router = Router();
const controller = new PostController();

router.get('/', controller.getPosts);
router.get('/:postId', controller.getPostById);
router.put('/', controller.getPostsByIds);

router.post('/', controller.createNewPost);
router.post('/_fake', controller.createFakePosts);
router.get('/isAlive', (req, res) => res.status(201).end());

export default router;
