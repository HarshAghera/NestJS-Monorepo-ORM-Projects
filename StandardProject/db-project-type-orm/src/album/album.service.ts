import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private repo: Repository<Album>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const data = this.sanitizeAlbum(createAlbumDto);
    const todo = this.repo.create(data);
    const resp = await this.repo.save(todo);
    const user = await this.userRepo.findOneBy({ id: resp.userId });
    return this.transformAlbumWithUser([resp], [user]);
  }

  async findAll(): Promise<CreateAlbumDto[]> {
    const todos = await this.repo.find();
    const users = await this.userRepo.find();
    return this.transformAlbumWithUser(todos, users);
  }

  async findOne(id: number): Promise<CreateAlbumDto> {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new BadRequestException(`Album with id ${id} not found`);
    const user = await this.userRepo.findOneBy({ id: todo.userId });
    return this.transformAlbumWithUser([todo], [user])[0];
  }

  async update(
    id: number,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<CreateAlbumDto> {
    const todo = this.findOne(id);
    if (!todo) throw new BadRequestException(`Album with id ${id} not found`);
    const data = this.sanitizeAlbum(updateAlbumDto);
    delete data.id;
    await this.repo.update(id, { ...data });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  transformAlbumWithUser(todos: Album[], users: User[]): CreateAlbumDto[] {
    return todos.map((todo: Album) => {
      const user = users.find((u) => u.id === todo.userId);
      return {
        user: {
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email,
        },
        id: todo.id,
        title: todo.title,
      };
    });
  }
  sanitizeAlbum(dto: UpdateAlbumDto): Album {
    return {
      id: 0,
      userId: dto.user.id,
      title: dto.title,
    };
  }
}
