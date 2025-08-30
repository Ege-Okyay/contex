import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateDto {
  @IsString()
  @MinLength(3, { message: 'Username must have minimum 3 characters' })
  @IsOptional()
  newUsername: string;

  @IsString()
  @MinLength(8, { message: 'Password must have minimum 8 characters' })
  @IsOptional()
  newPassword: string;
}
