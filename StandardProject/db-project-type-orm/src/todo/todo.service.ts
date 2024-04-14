import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private repo: Repository<Todo>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const data = this.sanitizeTodo(createTodoDto);
    const todo = this.repo.create(data);
    const resp = await this.repo.save(todo);
    const user = await this.userRepo.findOneBy({ id: resp.userId });
    return this.transformTodoWithUser([resp], [user]);
  }

  async findAll(): Promise<CreateTodoDto[]> {
    const todos = await this.repo.find();
    const users = await this.userRepo.find();
    return this.transformTodoWithUser(todos, users);
  }

  async findOne(id: number): Promise<CreateTodoDto> {
    const todo = await this.repo.findOneBy({ id });
    const user = await this.userRepo.findOneBy({ id: todo.userId });
    if (!todo) throw new BadRequestException(`Todo with id ${id} not found`);
    return this.transformTodoWithUser([todo], [user])[0];
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<CreateTodoDto> {
    const todo = this.findOne(id);
    if (!todo) throw new BadRequestException(`Todo with id ${id} not found`);
    const data = this.sanitizeTodo(updateTodoDto);
    delete data.id;
    await this.repo.update(id, { ...data });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformTodoWithUser(todos: Todo[], users: User[]): CreateTodoDto[] {
    return todos.map((todo: Todo) => {
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
        completed: todo.completed,
      };
    });
  }
  sanitizeTodo(dto: UpdateTodoDto): Todo {
    return {
      id: 0,
      userId: dto.user.id,
      title: dto.title,
      completed: dto.completed,
    };
  }
}
