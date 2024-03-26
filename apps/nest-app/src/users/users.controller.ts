import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from '../middlewares/logger.middlware';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    logger(createUserDto);
    this.usersService.create(createUserDto);
    return createUserDto;
  }

  @Get()
  findAll(): CreateUserDto[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CreateUserDto {
    logger(id);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    logger({id,updateUserDto});
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    logger(id);
    return this.usersService.remove(+id);
  }
}
