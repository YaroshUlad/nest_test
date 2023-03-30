import { SignInDto } from 'src/auth/dto/signIn.dto';

export interface SignUpDto extends SignInDto {
  tag?: string;
}
