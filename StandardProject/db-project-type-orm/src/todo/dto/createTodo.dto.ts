import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from '../dto/user.dto';

export class CreateTodoDto { 
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
