import { Post, PostModel } from "./post.entity";
import { CreatePostRequestDto } from './dto/create-post.request.dto';

export class PostService {
  public async getPosts(start: number = 0, limit: number = 20): Promise<PostModel[]> {
    const Posts = await Post.find({}).skip(start).limit(limit);
    return Posts;
  }

  public async getPostsByIds(postIds: string[]): Promise<PostModel[]> {
    const Posts = await Post.find({ '_id': { $in: postIds } })
    return Posts;
  }

  public async createPost(postRequest: CreatePostRequestDto): Promise<PostModel> {
    const tags = postRequest.tags;

    const createdPost = await Post.create(postRequest);
    return createdPost;
  }
}
