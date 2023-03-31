import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeedDocument = HydratedDocument<Deed>;

@Schema()
export class Deed {
  @Prop({ required: true })
  title: string;

  @Prop()
  ownerId: string;
}

export const DeedSchema = SchemaFactory.createForClass(Deed);
