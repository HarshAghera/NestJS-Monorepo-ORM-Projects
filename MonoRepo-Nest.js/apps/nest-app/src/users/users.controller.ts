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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { logger } from '@app/common/middlewares/logger.middlware';
import { ParseDatePipe } from '@app/common/pipes/parseDate.pipe';
import { AdminRoleGuard } from '@app/common/guards/admin.guard';
import { LogExecutionTime } from '@app/common/decorators/logExecution.decorator';
import { User } from './schemas/schemas';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const createData = createUserDto;
      const ret = this.usersService.create(createData);
      logger(createData);
      return ret;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  @LogExecutionTime()
  @UseGuards(AdminRoleGuard)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    logger(id);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User>  {
    logger({ id, updateUserDto });
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    logger(id);
    return this.usersService.remove(id);
  }

  @Post('date')
  @UsePipes(new ParseDatePipe())
  getDate(@Body() data: string) {
    return { message: 'Timestamp is valid', date: data };
  }
}
