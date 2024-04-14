import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), PassportModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService, TypeOrmModule.forFeature([Todo])],
})
export class TodoModule {}
