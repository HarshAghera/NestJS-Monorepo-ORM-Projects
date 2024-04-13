import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { CompanyDto } from './dto/company.dto';
import { GeoDto } from './dto/geo.dto';
import { AddressDto } from './dto/addres.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const data = this.mapDtoToUser(createUserDto);
    const user = this.repo.create(data);
    const resp = await this.repo.save(user);
    return this.mapUserEntityToDto(resp);
  }

  async findAll(): Promise<CreateUserDto[]> {
    const users = await this.repo.find();
    return users.map((user) => this.mapUserEntityToDto(user));
  }

  async findOne(id: number): Promise<CreateUserDto> {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new BadRequestException(`User with id ${id} not found`);
    return this.mapUserEntityToDto(user);
  }

  findUser(username: string, password: string): Promise<User> {
    return this.repo.findOneBy({ email: username, password });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserDto> {
    const user = this.findOne(id);
    if (!user) throw new BadRequestException(`User with id ${id} not found`);
    const data = this.mapDtoToUser(updateUserDto);
    await this.repo.update(id, { ...data });
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }

  private mapUserEntityToDto(user: User): CreateUserDto {
    const addressDto = plainToClass(AddressDto, {
      street: user.street,
      suite: user.suite,
      city: user.city,
      zipcode: user.zipcode,
      geo: plainToClass(GeoDto, {
        lat: user.lat,
        lng: user.lng,
      }),
    });

    const companyDto = plainToClass(CompanyDto, {
      name: user.companyName,
      catchPhrase: user.companyCatchPhrase,
      bs: user.companyBs,
    });

    return plainToClass(CreateUserDto, {
      id: user.id,
      name: user.name,
      username: user.userName,
      email: user.email,
      password: user.password,
      address: addressDto,
      phone: user.phone,
      website: user.website,
      company: companyDto,
    });
  }

  private mapDtoToUser(dto: UpdateUserDto): User {
    const address = plainToClass(AddressDto, dto.address);
    const geo = plainToClass(GeoDto, dto.address.geo);
    const company = plainToClass(CompanyDto, dto.company);

    const user = new User();
    user.name = dto.name;
    user.userName = dto.username;
    user.email = dto.email;
    user.password = dto.password;
    user.street = address.street;
    user.suite = address.suite;
    user.city = address.city;
    user.zipcode = address.zipcode;
    user.lat = geo.lat;
    user.lng = geo.lng;
    user.phone = dto.phone;
    user.website = dto.website;
    user.companyName = company.name;
    user.companyCatchPhrase = company.catchPhrase;
    user.companyBs = company.bs;

    return user;
  }
}
