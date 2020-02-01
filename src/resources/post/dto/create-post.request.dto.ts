export interface CreatePostRequestDto {
  title: string;
  content: string;
  type: string;
  tags: string[];
}