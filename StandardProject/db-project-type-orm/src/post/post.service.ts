import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const data = this.sanitizePost(createPostDto);
    const todo = this.repo.create(data);
    const resp = await this.repo.save(todo);
    const user = await this.userRepo.findOneBy({ id: resp.userId });
    return this.transformPostWithUser([resp], [user]);
  }

  async findAll(): Promise<CreatePostDto[]> {
    const todos = await this.repo.find();
    const users = await this.userRepo.find();
    return this.transformPostWithUser(todos, users);
  }

  async findOne(id: number): Promise<CreatePostDto> {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new BadRequestException(`Post with id ${id} not found`);
    const user = await this.userRepo.findOneBy({ id: todo.userId });
    return this.transformPostWithUser([todo], [user])[0];
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<CreatePostDto> {
    const todo = this.findOne(id);
    if (!todo) throw new BadRequestException(`Post with id ${id} not found`);
    const data = this.sanitizePost(updatePostDto);
    delete data.id;
    await this.repo.update(id, { ...data });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformPostWithUser(todos: Post[], users: User[]): CreatePostDto[] {
    return todos.map((todo: Post) => {
      const user = users.find((u) => u.id === todo.userId);
      return {
        user: {
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email,
        },
        id: todo.id,
        title: todo.title,
        body: todo.body,
      };
    });
  }
  sanitizePost(dto: UpdatePostDto): Post {
    return {
      id: 0,
      userId: dto.user.id,
      title: dto.title,
      body: dto.body,
    };
  }
}
