import * as faker from "faker";
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

  public getPostById = async (req: Request, res: Response) => {
    try {
      const post = await postService.getPostsById(req.params.postId);
      return res.status(OK).json({ post });
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

  public createFakePosts = async (req: Request, res: Response) => {
    try {
      const size = req.query.size;
      if (size > 50) {
        throw new Error("Maximum 50 fake can be created");
      }
      console.log("Creating 500 fake post in server");
      for (let i = 0; i < size; i++) {
        {
          const post = {
            content: faker.internet.avatar(),
            title: faker.lorem.words(5),
            commentsCount: Math.random(),
            likesCount: Math.random(),
            points: Math.random(),
            postedBy: {
              firstName: faker.internet.userName(),
              id: faker.lorem.word(),
              lastName: faker.internet.userName(),
              middleName: faker.internet.userName(),
              userName: faker.internet.userName()
            },
            postedOn: faker.date.past(),
            tags: this.generateTags(),
            type: faker.internet.domainName(),
            views: Math.random()
          };

          await postService.createPost(post);
        }
      }
    } catch (err) {
      logger.error(err.message, err);
      return res.status(BAD_REQUEST).json({
        error: err.message
      });
    }
  };

  private generateTags(): string[] {
    const tags: string[] = [];
    for (let index = 0; index < 5; index++) {
      tags.push(faker.random.word());
    }
    return tags;
  }
}
