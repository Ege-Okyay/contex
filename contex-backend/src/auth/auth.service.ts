import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async register(dto: RegisterDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword
      }
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username }
    });

    if (!user) return new UnauthorizedException('Username does not exist');
    if (!await bcrypt.compare(dto.password, user.password)) return new UnauthorizedException('Wrong password');

    const payload = { username: user.username, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async update(dto: UpdateDto, id: string) {
    const data: { username?: string, password?: string } = {};

    if (dto.newUsername) data.username = dto.newUsername;
    if (dto.newPassword) data.password = await bcrypt.hash(dto.newPassword, await bcrypt.genSalt());

    if (Object.keys(data).length === 0) {
      return this.prisma.user.findUnique({ where: { id } });
    }

    return await this.prisma.user.update({
      where: { id },
      data
    });
  }
}
