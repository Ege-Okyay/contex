import {
  CanActivate,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetupGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(): Promise<boolean> {
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      throw new ForbiddenException('Setup is already completed');
    }
    return true;
  }
}
