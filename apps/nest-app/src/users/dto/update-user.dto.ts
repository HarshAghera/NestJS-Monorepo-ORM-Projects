import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { AddressDto } from './user-address.dto';
import { IsOptional } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  address?: Partial<AddressDto>;
}
