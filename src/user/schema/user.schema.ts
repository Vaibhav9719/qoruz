import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, type: Number, min: 1 })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number, min: 18, max: 70 })
  age: number;

  @Prop({
    required: true,
    match: /.+@gmail\.com$/,
    unique: true,
    set: (value: string) => value.toLowerCase(),
  })
  email: string;

  @Prop({
    required: true,
    match: /^\+\d{1,3} \d{6,}$/,
  })
  phone: string;

  @Prop({ required: true, match: /^\d{6}$/, })
  postal_code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);