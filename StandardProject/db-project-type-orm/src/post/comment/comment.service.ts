import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const data = this.sanitizeComment(createCommentDto);
    const todo = this.repo.create(data);
    const resp = await this.repo.save(todo);
    const post = await this.postRepo.findOneBy({ id: resp.postId });
    return this.transformCommentWithPost([resp], [post])[0];
  }

  async findAll(postId: number): Promise<CreateCommentDto[]> {
    const photos = await this.repo.findBy({ postId });
    const posts = await this.postRepo.findBy({ id: postId });
    return this.transformCommentWithPost(photos, posts);
  }

  async findOne(id: number, postId: number): Promise<CreateCommentDto> {
    const photo = await this.repo.findOneBy({ id, postId });
    if (!photo)
      throw new BadRequestException(`Comment with id ${id} not found`);
    const post = await this.postRepo.findOneBy({ id: postId });
    return this.transformCommentWithPost([photo], [post])[0];
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CreateCommentDto> {
    const todo = this.findOne(id, updateCommentDto.post.id);
    if (!todo) throw new BadRequestException(`Comment with id ${id} not found`);
    const data = this.sanitizeComment(updateCommentDto);
    delete data.id;
    await this.repo.update(id, { ...data });
    return await this.findOne(id, updateCommentDto.post.id);
  }

  remove(id: number, postId: number) {
    return this.repo.delete({ id, postId });
  }

  transformCommentWithPost(
    photos: Comment[],
    posts: Post[],
  ): CreateCommentDto[] {
    return photos.map((photo: Comment) => {
      const post = posts.find((u) => u.id === photo.postId);
      return {
        post: {
          id: post.id,
        },
        id: photo.id,
        name: photo.name,
        email: photo.email,
        body: photo.body,
      };
    });
  }
  sanitizeComment(dto: UpdateCommentDto): Comment {
    return {
      id: 0,
      postId: dto.post.id,
      name: dto.name,
      email: dto.email,
      body: dto.body,
    };
  }
}
