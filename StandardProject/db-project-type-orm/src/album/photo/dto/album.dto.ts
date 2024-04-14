import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title: string;
}
