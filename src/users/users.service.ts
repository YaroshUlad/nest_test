import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class UsersService {
  private readonly users: UserModel[] = [
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

  async getAll(): Promise<UserModel[]> {
    return this.users ? this.users : [];
  }
}
