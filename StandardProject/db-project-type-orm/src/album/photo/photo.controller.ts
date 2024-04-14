import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { UpdatePhotoDto } from './dto/updatePhoto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('albums/:albumId/photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Param('albumId', ParseIntPipe) albumId: number) {
    return this.photoService.findAll(albumId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Param('albumId', ParseIntPipe) albumId: number,
  ) {
    return this.photoService.findOne(id, albumId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Param('albumId', ParseIntPipe) albumId: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.photoService.remove(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }
}
