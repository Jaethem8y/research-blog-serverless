import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO, LoginDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../typeorm/entities/Admin';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDTO) {
    try {
      const hash = await argon.hash(dto.password);
      const admin = await this.adminRepository.save({
        ...dto,
        password: hash,
      });
      delete admin.password;
      return admin;
    } catch (e) {
      console.error(e);
      return 'no';
    }
  }
  async signin(dto: LoginDTO) {
    console.log('dto:', dto);
    const user = await this.adminRepository.findOneBy({
      username: dto.username,
    });
    console.log('user:', user);
    if (!user) throw new ForbiddenException('No user does not exist');
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('No');
    return await this.signToken(user.username);
  }

  async signToken(username: string): Promise<{ access_token: string }> {
    const payload = {
      sub: username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
