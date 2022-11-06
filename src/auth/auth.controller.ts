import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto';
import { Response as Res } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: AuthDTO, @Response() res: Res) {
    const body = await this.authService.signup(dto);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }

  @Post('/signin')
  async singin(@Body() dto: LoginDTO, @Response() res: Res) {
    console.log('here', dto.username);
    const body = await this.authService.signin(dto);
    return res
      .set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      })
      .json(body);
  }
}
