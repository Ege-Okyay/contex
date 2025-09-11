import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3, { message: 'Title must have minimum 3 characters' })
  title: string;
}
