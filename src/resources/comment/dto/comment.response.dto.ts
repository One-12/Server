export class CommentResponseDto {
  id: string | undefined;
  content: string | undefined;
  postId: string | undefined;
  parentId: string | undefined;
  likesCount: number | undefined;
}
