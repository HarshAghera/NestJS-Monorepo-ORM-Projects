import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User]), PassportModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService, TypeOrmModule.forFeature([Todo,User])],
})
export class TodoModule {}
