import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService, SignInReturn } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { Public } from 'src/auth/constants';
import { SignUpDto } from 'src/auth/dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<SignInReturn> {
    const res = this.authService.signIn(signInDto.username, signInDto.password);
    return res;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signInDto: SignUpDto): Promise<SignInReturn> {
    return this.authService.signUp(
      signInDto.username,
      signInDto.password,
      signInDto.tag,
    );
  }

  //@UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
