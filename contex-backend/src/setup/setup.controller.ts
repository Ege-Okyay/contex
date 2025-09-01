import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('setup')
export class SetupController {
  constructor(private prisma: PrismaService) { }

  @Get('status')
  async getStatus() {
    return { completed: await this.prisma.user.count() > 0 };
  }
}
