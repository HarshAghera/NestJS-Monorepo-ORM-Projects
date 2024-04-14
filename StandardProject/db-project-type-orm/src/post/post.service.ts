import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const post = this.repo.create(createPostDto);
    const resp = await this.repo.save(post);
    return this.transformPostWithUser([resp]);
  }

  async findAll(): Promise<CreatePostDto[]> {
    const posts = await this.repo.find({ relations: ['user'] });
    return this.transformPostWithUser(posts);
  }

  async findOne(id: number): Promise<CreatePostDto> {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) throw new BadRequestException(`Post with id ${id} not found`);
    return this.transformPostWithUser([post])[0];
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<CreatePostDto> {
    const post = this.findOne(id);
    if (!post) throw new BadRequestException(`Post with id ${id} not found`);
    await this.repo.update(id, { ...updatePostDto });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformPostWithUser(posts: Post[]): CreatePostDto[] {
    return posts.map((post: Post) => {
      return {
        user: {
          id: post.user.id,
          name: post.user.name,
          userName: post.user.userName,
          email: post.user.email,
        },
        id: post.id,
        title: post.title,
        body: post.body,
      };
    });
  }
}
