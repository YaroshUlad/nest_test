import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/users/user.model';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { badRequest } from 'src/exceptions/badRequest';
import { notFound } from 'src/exceptions/notFound';

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserModel | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<UserModel> {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      notFound('User with current id not found');
    }

    return user;
  }

  async getAll(): Promise<UserModel[]> {
    return this.users ? this.users : [];
  }

  async update(id: number, payload: UpdateUserDto): Promise<UserModel> {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      notFound('User with current id not found');
    }

    if (!payload.username.trim()) {
      badRequest('Not valid username');
    }

    const newUser = { ...user, ...payload };

    this.users = this.users.map((el) =>
      el.userId !== id ? el : { ...el, ...newUser },
    );
    return newUser;
  }

  async delete(id: number): Promise<[] | undefined> {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      notFound('User with current id not found');
    }

    this.users = this.users.filter((el) => el.userId !== id);
    return [];
  }

  async create(username: string, password: string): Promise<UserModel> {
    const userId = Date.now();
    const newUser = { userId, username, password };
    this.users = [...this.users, newUser];
    return newUser;
  }
}
