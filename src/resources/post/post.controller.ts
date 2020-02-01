import { logger } from "@shared";
import { paramMissingError } from "@shared";
import { Request, Response, Router, Express } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";

import { PostService } from "./post.service";

const router = Router();
const postService = new PostService();

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const posts = await postService.getPosts(
        req.query.start,
        req.query.limit
      );
      return res.status(OK).json({ posts });
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };

  public getPostsByIds = async (req: Request, res: Response) => {
    try {
      const postIds = req.body;
      const posts = await postService.getPostsByIds(postIds);
      return res.status(OK).json({ posts });
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };

  public createNewPost = async (req: Request, res: Response) => {
    try {
      const posts = req.body;
      if (!posts) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError
        });
      }
      const createdPost = await postService.createPost(posts);
      return res.status(CREATED).json(createdPost);
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };
}
