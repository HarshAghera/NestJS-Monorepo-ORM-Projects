import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Roles extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Roles);
