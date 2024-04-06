import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles } from './schemas/roles.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private readonly roleModel: Model<Roles>,
  ) {}

  async findByUserId(userId: string): Promise<Roles | null> {
    return this.roleModel.findOne({ userId }).exec();
  }
}
