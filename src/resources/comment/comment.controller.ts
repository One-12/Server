import { logger } from "@shared";
import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";

import { CommentService } from "./comment.service";

const commentService = new CommentService();

export class CommentController {
  public getCommentsForPost = async (req: Request, res: Response) => {
    try {
      const posts = await commentService.getCommentsForPost(req.query.postId);
      return res.status(OK).json({ posts });
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };

  public createComment = async (req: Request, res: Response) => {
    try {
      const createCommentRequest = req.body;
      const createdComment = await commentService.addComment(
        createCommentRequest
      );
      return res.status(CREATED).json({ createdComment });
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };
}
