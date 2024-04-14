import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoService } from './photo.service';
import { PassportModule } from '@nestjs/passport';
import { Album } from '../entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Album]), PassportModule],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService, TypeOrmModule.forFeature([Photo, Album])],
})
export class PhotoModule {}
