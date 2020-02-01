import { logger } from "@shared";
import { paramMissingError } from "@shared";
import { Request, Response, Router, Express } from "express";
import { BAD_REQUEST, CREATED, OK } from "http-status-codes";

import { TagService } from "./tag.service";

const router = Router();
const tagService = new TagService();

export const getTrendingTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagService.getTrendingTags();
    return res.status(OK).json({ tags });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
};

export const createNewTag = async (req: Request, res: Response) => {
  try {
    const tag = req.body;
    if (!tag) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    const createdTag = await tagService.createTag(tag);
    return res.status(CREATED).json(createdTag);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
};
