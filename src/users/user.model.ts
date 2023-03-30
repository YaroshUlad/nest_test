export interface UserModel {
  userId: string;
  username: string;
  tag: string;
  password: string;
  friends: string[];
  deeds: string[];
}

export type UserModelWithoutPassword = Omit<UserModel, 'password'>;
