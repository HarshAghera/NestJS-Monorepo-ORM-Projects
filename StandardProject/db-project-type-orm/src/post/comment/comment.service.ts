import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.repo.create(createCommentDto);
    const resp = await this.repo.save(comment);
    return this.transformCommentWithPost([resp])[0];
  }

  async findAll(postId: number): Promise<CreateCommentDto[]> {
    const comments = await this.repo.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });
    return this.transformCommentWithPost(comments);
  }

  async findOne(id: number, postId: number): Promise<CreateCommentDto> {
    const comment = await this.repo.findOne({
      where: { id, post: { id: postId } },
      relations: ['post'],
    });
    if (!comment)
      throw new BadRequestException(`Comment with id ${id} not found`);
    return this.transformCommentWithPost([comment])[0];
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CreateCommentDto> {
    const comment = this.findOne(id, updateCommentDto.post.id);
    if (!comment)
      throw new BadRequestException(`Comment with id ${id} not found`);
    await this.repo.update(id, { ...updateCommentDto });
    return await this.findOne(id, updateCommentDto.post.id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformCommentWithPost(comments: Comment[]): CreateCommentDto[] {
    return comments.map((comment: Comment) => {
      return {
        post: {
          id: comment.post.id,
        },
        id: comment.id,
        name: comment.name,
        email: comment.email,
        body: comment.body,
      };
    });
  }
}
