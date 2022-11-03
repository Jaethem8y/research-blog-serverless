import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  role: string;
}
