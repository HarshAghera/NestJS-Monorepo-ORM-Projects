import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  userData = [];
  create(createUserDto: CreateUserDto) {
    this.userData.push(createUserDto);
  }

  findAll(): CreateUserDto[] {
    return this.userData;
  }

  findOne(id: number): CreateUserDto {
    const data = this.userData.filter((item) => item.id === id);
    return data[0];
  }

  update(id: number, updateUserDto: UpdateUserDto): UpdateUserDto {
    const oldData = this.findOne(id);
    const index = this.userData.indexOf(oldData);
    const updatedData = { ...oldData, ...updateUserDto };
    if (index >= 0 && index < this.userData.length) {
      this.userData[index] = updatedData;
    }
    this.userData.push(updatedData);
    return this.findOne(id);
  }

  remove(id: number) {
    const oldData = this.findOne(id);
    const index = this.userData.indexOf(oldData);
    if (index >= 0 && index < this.userData.length) {
      this.userData.splice(index, 1);
      return `removed a user with id #${id}`;
    }
    return `Unable to remove`;
  }
}
