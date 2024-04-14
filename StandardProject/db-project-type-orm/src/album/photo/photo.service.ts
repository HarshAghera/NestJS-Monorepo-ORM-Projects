import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/createPhoto.dto';
import { UpdatePhotoDto } from './dto/updatePhoto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { Album } from '../entities/album.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private repo: Repository<Photo>,
    @InjectRepository(Album) private albumRepo: Repository<Album>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto) {
    const data = this.sanitizePhoto(createPhotoDto);
    const todo = this.repo.create(data);
    const resp = await this.repo.save(todo);
    const album = await this.albumRepo.findOneBy({ id: resp.albumId });
    return this.transformPhotoWithAlbum([resp], [album])[0];
  }

  async findAll(albumId: number): Promise<CreatePhotoDto[]> {
    const photos = await this.repo.findBy({ albumId });
    const albums = await this.albumRepo.findBy({ id: albumId });
    return this.transformPhotoWithAlbum(photos, albums);
  }

  async findOne(id: number, albumId: number): Promise<CreatePhotoDto> {
    const photo = await this.repo.findOneBy({ id, albumId });
    if (!photo) throw new BadRequestException(`Photo with id ${id} not found`);
    const album = await this.albumRepo.findOneBy({ id: albumId });
    return this.transformPhotoWithAlbum([photo], [album])[0];
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<CreatePhotoDto> {
    const todo = this.findOne(id, updatePhotoDto.album.id);
    if (!todo) throw new BadRequestException(`Photo with id ${id} not found`);
    const data = this.sanitizePhoto(updatePhotoDto);
    delete data.id;
    await this.repo.update(id, { ...data });
    return await this.findOne(id, updatePhotoDto.album.id);
  }

  remove(id: number, albumId: number) {
    return this.repo.delete({ id, albumId });
  }

  transformPhotoWithAlbum(photos: Photo[], albums: Album[]): CreatePhotoDto[] {
    return photos.map((photo: Photo) => {
      const album = albums.find((u) => u.id === photo.albumId);
      return {
        album: {
          id: album.id,
          title: album.title,
        },
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      };
    });
  }
  sanitizePhoto(dto: UpdatePhotoDto): Photo {
    return {
      id: 0,
      albumId: dto.album.id,
      title: dto.title,
      url: dto.url,
      thumbnailUrl: dto.thumbnailUrl,
    };
  }
}
