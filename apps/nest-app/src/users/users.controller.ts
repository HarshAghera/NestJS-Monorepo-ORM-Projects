import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from '../middlewares/logger.middlware';
import { ParseDatePipe } from '../custom-pipes/parseDate.pipe';
import { CommonService } from '@app/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private commonService = new CommonService();
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const id = this.commonService.generateId();
    const createData = { id, ...createUserDto };
    this.usersService.create(createData);
    logger(createData);
    return createData;
  }

  @Get()
  findAll(): CreateUserDto[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UsePipes(new ParseIntPipe())
  findOne(@Param('id') id: string): CreateUserDto {
    logger(id);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ParseIntPipe())
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    logger({ id, updateUserDto });
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UsePipes(new ParseIntPipe())
  remove(@Param('id') id: string) {
    logger(id);
    return this.usersService.remove(+id);
  }

  @Post('date')
  @UsePipes(new ParseDatePipe())
  getDate(@Body() data: { timestamp: string }) {
    const timestampString = new Date(+data.timestamp);
    return { message: 'Timestamp is valid', timestamp: timestampString };
  }
}
