import { Injectable } from '@nestjs/common';
import { UserModel, UserModelWithoutPassword } from 'src/users/user.model';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { badRequest } from 'src/exceptions/badRequest';
import { notFound } from 'src/exceptions/notFound';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(key: string, value: string): Promise<UserModel | undefined> {
    try {
      const res = await this.userModel.find({ [key]: value });
      // console.log('res findOne ', res);
      if (res.length === 0) return;
      const {
        id: userId,
        username: alias,
        tag,
        password,
        friends,
        deeds,
      } = res.find((user) => user[key === '_id' ? 'id' : key] === value);
      return {
        userId,
        username: alias,
        tag,
        password,
        friends,
        deeds,
      };
    } catch (e) {
      notFound(`User with current ${key} not found`);
    }
  }

  async getAll(): Promise<UserModelWithoutPassword[]> {
    try {
      const res = await this.userModel.find();
      return res.map(({ id: userId, username, tag, friends, deeds }) => ({
        userId,
        username,
        tag,
        friends,
        deeds,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<UserModelWithoutPassword> {
    if (!payload || !payload.username || !payload.username.trim()) {
      badRequest('Not valid username');
    }
    try {
      const {
        id: userId,
        username,
        tag,
        friends,
        deeds,
      } = await this.userModel.findOneAndUpdate(
        {
          _id: id,
        },
        { $set: payload },
        { returnDocument: 'after', returnOriginal: false },
      );
      return {
        userId,
        username,
        tag,
        friends,
        deeds,
      };
    } catch (e) {
      notFound('User with current id not found');
    }
  }

  async delete(id: string): Promise<[] | undefined> {
    try {
      await this.userModel.findByIdAndDelete(id);
      // console.log('after delete ', res);
      return [];
    } catch (e) {
      notFound('User with current id not found');
    }
  }

  async create(
    username: string,
    password: string,
    tag?: string,
  ): Promise<UserModel> {
    try {
      const res = await this.userModel.create({
        username,
        password,
        tag: tag ? tag : username,
        friends: [],
        deeds: [],
      });
      return {
        userId: res.id,
        username: res.username,
        password: res.password,
        friends: [],
        tag: res.tag,
        deeds: [],
      };
    } catch (e) {
      console.log(e);
    }
  }
}
