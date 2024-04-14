import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { PostDto } from './post.dto';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostDto)
  post: PostDto;
}
