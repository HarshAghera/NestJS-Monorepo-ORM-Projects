import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './createPhoto.dto';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}
