import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), PassportModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService, TypeOrmModule.forFeature([Post])],
})
export class PostModule {}
