import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SetupModule,
    ProjectModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
