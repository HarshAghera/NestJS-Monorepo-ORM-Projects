import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AlbumDto } from './album.dto';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  thumbnailUrl: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AlbumDto)
  album: AlbumDto;
}
