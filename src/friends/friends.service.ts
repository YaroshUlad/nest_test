import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addFriend(ownerId: string, friendId: string) {
    try {
      await this.userModel.findByIdAndUpdate(ownerId, {
        $push: { friends: friendId },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFriend(ownerId: string, friendId: string) {
    try {
      await this.userModel.findByIdAndUpdate(ownerId, {
        $pull: { friends: friendId },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
