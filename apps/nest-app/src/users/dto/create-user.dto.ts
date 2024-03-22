import {
  IsNotEmpty,
  IsString,
  IsEmail,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { AddressDto } from './user-address.dto';
import { Type } from 'class-transformer';
export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address?: Partial<AddressDto>;
}
