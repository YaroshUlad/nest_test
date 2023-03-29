import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export interface SignInReturn {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<SignInReturn> {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.userId };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<SignInReturn> {
    const user = await this.userService.findOne(username);

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User with current username already exist',
        },
        HttpStatus.BAD_REQUEST,
        {
          description: 'User with current username already exist',
        },
      );
    }

    const createdUser = await this.userService.create(username, password);

    const payload = { username: createdUser.username, sub: createdUser.userId };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
