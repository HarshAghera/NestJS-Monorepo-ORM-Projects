import { IsNotEmpty, IsString, IsEmail, ValidateNested } from 'class-validator';
import { AddressDto } from './user-address.dto';
import { Type } from 'class-transformer';
export class CreateUserDto {
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
  @IsNotEmpty()
  address: AddressDto;
}
