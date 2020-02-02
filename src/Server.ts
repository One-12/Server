import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import BaseRouter from './routes';
import TagRouter from './resources/tag/tag.route';
import PostRouter from './resources/post/post.route';
import CommentRouter from './resources/comment/comment.route';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', BaseRouter);
app.use('/api/tags', TagRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);

export default app;

