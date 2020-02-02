export class GetPostResponseDto {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  views: number | undefined;
  points: number | undefined;
  type: string | undefined;
  tags: string[] | undefined;
  postedOn: Date | undefined;
  commentsCount: number | undefined;
  likesCount: number | undefined;
}
