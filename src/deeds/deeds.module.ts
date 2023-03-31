import { Module } from '@nestjs/common';
import { DeedsController } from './deeds.controller';
import { DeedsService } from './deeds.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from 'src/schemas/deed.schema';
// import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    // UsersModule,
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [DeedsController],
  providers: [DeedsService],
  exports: [DeedsService],
})
export class DeedsModule {}
