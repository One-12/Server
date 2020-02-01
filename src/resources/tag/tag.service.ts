import { Tag, TagModel } from "./tag.entity";

export class TagService {
  public async getTrendingTags(): Promise<TagModel[]> {
    const tags = await Tag.find({}).limit(10);
    return tags;
  }

  public async createTag(tagRequest: TagModel): Promise<TagModel> {
    const createdTag = await Tag.create(tagRequest);
    return createdTag;
  }
}
