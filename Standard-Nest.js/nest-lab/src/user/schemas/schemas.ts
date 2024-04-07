import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const AddressType = {
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
};
interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
}
@Schema()
export class User extends Document {
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop({
    required: false,
    type: AddressType,
  })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
