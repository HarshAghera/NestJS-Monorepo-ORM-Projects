import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PassportModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService, TypeOrmModule.forFeature([Comment])],
})
export class CommentModule {}
