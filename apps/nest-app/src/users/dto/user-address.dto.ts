import { IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  readonly address1: string;

  @IsNotEmpty()
  @IsString()
  readonly address2: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  readonly zipcode: string;
}
