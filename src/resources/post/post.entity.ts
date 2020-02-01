import * as mongoose from "mongoose";
import { TagSchema, TagModel } from "../tag/tag.entity";

export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  type: { type: String, required: true },
  tags: { type: [TagSchema] },
  postedOn: { type: Date, default: Date.now },
  commentsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 }
});

export interface PostModel extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  views: number;
  points: number;
  type: string;
  tags: TagModel[];
  postedOn: Date;
  commentsCount: number;
  likesCount: number;
}

export const Post = mongoose.model<PostModel>("post", PostSchema);
