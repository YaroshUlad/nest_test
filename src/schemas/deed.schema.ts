import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DeedDocument = HydratedDocument<Deed>;

@Schema()
export class Deed {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: string;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
