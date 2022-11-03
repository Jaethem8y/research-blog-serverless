import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../typeorm/entities/Post';
import { Repository } from 'typeorm';
import { Content } from '../typeorm/entities/Content';
import { PostDTO } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Content) private contentRepository: Repository<Content>,
  ) {}

  async savePost(dto: PostDTO) {
    const post = await this.postRepository.save({
      ...dto,
      createdAt: new Date(),
    });
    dto.contents.map(async (el) => {
      console.log(el);
      await this.contentRepository.save({
        ...el,
        post: post,
      });
    });
    return post;
  }

  async getPosts(category: string) {
    return await this.postRepository.find({
      where: {
        category: category,
      },
      relations: {
        contents: false,
      },
    });
  }

  async getPost(title: string) {
    return await this.postRepository.findOne({
      where: {
        title: title,
      },
      relations: {
        contents: true,
      },
    });
  }

  async updatePost(dto: PostDTO) {
    const post = await this.postRepository.findOne({
      where: {
        title: dto.title,
      },
      relations: {
        contents: true,
      },
    });
    await this.contentRepository.remove(post.contents);
    await this.postRepository.remove(post);

    const targetPost = await this.postRepository.save({
      ...dto,
      createdAt: new Date(),
    });
    dto.contents.map(async (el) => {
      console.log(el);
      await this.contentRepository.save({
        ...el,
        post: post,
      });
    });
    return targetPost;
  }

  async deletePost(title: string) {
    const post = await this.postRepository.findBy({ title: title });
    return await this.postRepository.remove(post);
  }
}
