import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
