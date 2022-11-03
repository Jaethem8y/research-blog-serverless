import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDTO } from './dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts/:category')
  async posts(@Param() params) {
    const category = params.category;
    return await this.postService.getPosts(category);
  }

  @Get('/post/:title')
  async post(@Param() params) {
    const title = params.title;
    return await this.postService.getPost(title);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/post/add')
  async addPost(@Body() dto: PostDTO) {
    return await this.postService.savePost(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/post/edit')
  async editPost(@Body() dto: PostDTO) {
    return await this.postService.updatePost(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/post/delete/:title')
  async deletePost(@Param() params) {
    const title = params.title;
    return await this.postService.deletePost(title);
  }
}
