import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: AuthDTO) {
    return await this.authService.signup(dto);
  }

  @Post('/signin')
  async singin(@Body() dto: LoginDTO) {
    console.log('here', dto.username);
    return await this.authService.signin(dto);
  }
}
