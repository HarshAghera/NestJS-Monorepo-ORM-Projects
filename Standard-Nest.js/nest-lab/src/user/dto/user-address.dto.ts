import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly address1: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly address2: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly zipcode: string;
}
