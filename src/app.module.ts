import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DeedsModule } from './deeds/deeds.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsModule } from './friends/friends.module';

const uri = 'mongodb+srv://deeds:root@deeds.dg7fx9g.mongodb.net/test';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DeedsModule,
    FriendsModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
