import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './typeorm/entities/Admin';
import { Post } from './typeorm/entities/Post';
import { Content } from './typeorm/entities/Content';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
 
    }),
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
