import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3, { message: 'Username must have minimum 3 characters' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must have minimum 8 characters' })
  password: string;
}
