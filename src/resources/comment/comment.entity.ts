import * as mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  parentId: { type: mongoose.Schema.Types.ObjectId },
  postId: { type: mongoose.Schema.Types.ObjectId },
});


export interface CommentModel extends mongoose.Document {
  id: string;
  content: string,
  likesCount: number,
  parentId: string,
  postId: string
}

export const Comment = mongoose.model<CommentModel>("comments", CommentSchema);
  