import * as mongoose from "mongoose";

export const TagSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, unique: true }
});

export const TagPostSchema = new mongoose.Schema({
  tagId: { type: String, required: true },
  postIds: { type: [String] }
});

export interface TagModel extends mongoose.Document {
  id: string;
  name: string;
}

export const Tag = mongoose.model<TagModel>("tag", TagSchema);
