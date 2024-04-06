import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  userData = [];
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User>  {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const oldData = await this.userModel.findById(id).exec();
    if (!oldData) {
      return null;
    }
    oldData.set(updateUserDto);
    await oldData.save(); // Save the updated document
    return oldData; // Return the updated document
}

  remove(id: string) {
    const deleteResult = this.userModel.findByIdAndDelete(id).exec();
    if (!deleteResult) {
      return `Unable to remove user with id #${id}`;
    }
    return `Removed a user with id #${id}`;
  }
}
