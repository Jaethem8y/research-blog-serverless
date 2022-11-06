import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response as Res } from 'express';
import { PostDTO } from './dto';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts/:category')
  async posts(@Param() params, @Response() res: Res) {
    const category = params.category;
    const body = await this.postService.getPosts(category);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }

  @Get('/post/:title')
  async post(@Param() params, @Response() res: Res) {
    const title = params.title;
    const body = await this.postService.getPost(title);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/post/add')
  async addPost(@Body() dto: PostDTO, @Response() res: Res) {
    const body = this.postService.savePost(dto);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/post/edit')
  async editPost(@Body() dto: PostDTO, @Response() res: Res) {
    const body = await this.postService.updatePost(dto);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/post/delete/:title')
  async deletePost(@Param() params, @Response() res: Res) {
    const title = params.title;
    const body = await this.postService.deletePost(title);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }
}
