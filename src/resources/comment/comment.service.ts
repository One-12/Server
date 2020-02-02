import { CommentModel, Comment } from "./comment.entity";
import { AddCommentValidator } from "./validators/add-comment.validator";

const addCommentValidator = new AddCommentValidator();

export class CommentService {
  public async getCommentsForPost(postId: string): Promise<CommentModel[]> {
    const comments = await Comment.find({ postId: postId });
    return comments;
  }

  public async addComment(comment: CommentModel): Promise<CommentModel> {
    const validPromise = await addCommentValidator.validate(comment);
    const isInValid = validPromise.some(isValid => !isValid);

    if (isInValid) {
      throw new Error("Validation failed for creating the comment");
    }

    const createdComment = await Comment.create(comment);
    return createdComment;
  }
}
