import { Router } from 'express';
import { getTrendingTags, createNewTag } from './tag.controller';

const router = Router();

router.get('/', getTrendingTags);
router.post('/', createNewTag);
router.get('/isAlive', (req, res) => res.status(201).end());

export default router;
