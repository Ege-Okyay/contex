import { Body, Controller, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetupGuard } from 'src/guards/setup.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('auth')
export class AuthController { 
  constructor(private authService: AuthService) { } 

  @UseGuards(SetupGuard)
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() dto: UpdateDto, @Request() req) {
    return this.authService.update(dto, req.user.id);
  }
}
