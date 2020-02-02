import { Post } from "../../post/post.entity";
import { Comment, CommentModel } from "../comment.entity";

export class AddCommentValidator {
  public async validate(commentRequest: CommentModel): Promise<Boolean[]> {
    const parentValidation: Promise<Boolean> = this.validateIsParent(
      commentRequest.parentId
    );
    const postValidation: Promise<Boolean> = this.validatePost(
      commentRequest.postId
    );

    return await Promise.all([parentValidation, postValidation]);
  }

  private async validateIsParent(parentId: string): Promise<Boolean> {
    if (!parentId) {
      return Promise.resolve(true);
    }

    var parentComment = await Comment.findById(parentId);
    return !parentComment?.parentId;
  }

  private async validatePost(postId: string): Promise<Boolean> {
    if (!postId) {
      return Promise.resolve(false);
    }

    var post = await Post.findById(postId);
    return !!post;
  }
}
