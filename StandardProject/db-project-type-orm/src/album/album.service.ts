import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(@InjectRepository(Album) private repo: Repository<Album>) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.repo.create(createAlbumDto);
    const resp = await this.repo.save(album);
    return this.transformAlbumWithUser([resp]);
  }

  async findAll(): Promise<CreateAlbumDto[]> {
    const albums = await this.repo.find({
      relations: ['user'],
    });
    return this.transformAlbumWithUser(albums);
  }

  async findOne(id: number): Promise<CreateAlbumDto> {
    const album = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!album) throw new BadRequestException(`Album with id ${id} not found`);
    return this.transformAlbumWithUser([album])[0];
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<CreateAlbumDto> {
    const album = this.findOne(id);
    if (!album) throw new BadRequestException(`Album with id ${id} not found`);
    await this.repo.update(id, { ...updateAlbumDto });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformAlbumWithUser(albums: Album[]): CreateAlbumDto[] {
    return albums.map((album: Album) => {
      return {
        user: {
          id: album.user.id,
          name: album.user.name,
          userName: album.user.userName,
          email: album.user.email,
        },
        id: album.id,
        title: album.title,
      };
    });
  }
}
