import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: false,
    type: {
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
  })
  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
