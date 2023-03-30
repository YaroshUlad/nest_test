import { Module } from '@nestjs/common';
import { DeedsController } from './deeds.controller';
import { DeedsService } from './deeds.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from 'src/schemas/deed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [DeedsController],
  providers: [DeedsService],
  exports: [DeedsService],
})
export class DeedsModule {}
