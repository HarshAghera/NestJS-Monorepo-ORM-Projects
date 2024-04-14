import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.repo.create(createTodoDto);
    const resp = await this.repo.save(todo);
    return this.transformTodoWithUser([resp]);
  }

  async findAll(): Promise<CreateTodoDto[]> {
    const todos = await this.repo.find({
      relations: ['user'],
    });
    return this.transformTodoWithUser(todos);
  }

  async findOne(id: number): Promise<CreateTodoDto> {
    const todo = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!todo) throw new BadRequestException(`Todo with id ${id} not found`);
    return this.transformTodoWithUser([todo])[0];
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<CreateTodoDto> {
    const todo = this.findOne(id);
    if (!todo) throw new BadRequestException(`Todo with id ${id} not found`);
    await this.repo.update(id, { ...updateTodoDto });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformTodoWithUser(todos: Todo[]): CreateTodoDto[] {
    return todos.map((todo: Todo) => {
      return {
        user: {
          id: todo.user.id,
          name: todo.user.name,
          userName: todo.user.userName,
          email: todo.user.email,
        },
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      };
    });
  }
}
