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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/schemas';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      const createData = createUserDto;
      const ret = this.userService.create(createData);
      return ret;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  // @LogExecutionTime()
  // @UseGuards(AdminRoleGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.loginUser(loginDto);
    return user;
  }
}
