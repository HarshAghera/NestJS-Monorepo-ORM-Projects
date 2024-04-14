import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { UpdatePhotoDto } from './dto/updatePhoto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(@InjectRepository(Photo) private repo: Repository<Photo>) {}

  async create(createPhotoDto: CreatePhotoDto) {
    const photo = this.repo.create(createPhotoDto);
    const resp = await this.repo.save(photo);
    return this.transformPhotoWithAlbum([resp])[0];
  }

  async findAll(albumId: number): Promise<CreatePhotoDto[]> {
    const photos = await this.repo.find({
      where: { album: { id: albumId } },
      relations: ['album'],
    });
    return this.transformPhotoWithAlbum(photos);
  }

  async findOne(id: number, albumId: number): Promise<CreatePhotoDto> {
    const photo = await this.repo.findOne({
      where: { id, album: { id: albumId } },
      relations: ['album'],
    });
    if (!photo) throw new BadRequestException(`Photo with id ${id} not found`);
    return this.transformPhotoWithAlbum([photo])[0];
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<CreatePhotoDto> {
    const photo = this.findOne(id, updatePhotoDto.album.id);
    if (!photo) throw new BadRequestException(`Photo with id ${id} not found`);
    await this.repo.update(id, { ...updatePhotoDto });
    return await this.findOne(id, updatePhotoDto.album.id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformPhotoWithAlbum(photos: Photo[]): CreatePhotoDto[] {
    return photos.map((photo: Photo) => {
      return {
        album: {
          id: photo.album.id,
          title: photo.album.title,
        },
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      };
    });
  }
}
