import config from '../../../config.json';

import { Post, PostModel } from "./post.entity";
import { CreatePostRequestDto } from "./dto/create-post.request.dto";
import { QueueService } from "../queue/queue.service";

export class PostService {
  public async getPosts(
    start: number = 0,
    limit: number = 20
  ): Promise<PostModel[]> {
    const Posts = await Post.find({})
      .skip(start)
      .limit(limit);
    return Posts;
  }

  public async getPostsByIds(postIds: string[]): Promise<PostModel[]> {
    const Posts = await Post.find({ _id: { $in: postIds } });
    return Posts;
  }

  public async createPost(
    postRequest: CreatePostRequestDto
  ): Promise<PostModel> {
    const createdPost = await Post.create(postRequest);
    this.pushTags(postRequest);
    return createdPost;
  }

  private pushTags(postRequest: CreatePostRequestDto) {
    const tags = postRequest.tags;
    console.log(tags);
    if (tags && tags.length > 0) {
      const queue = new QueueService(config.job.tagPool);
      queue.produce(tags);
    }
  }
}
