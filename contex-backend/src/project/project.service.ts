import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async createProject(dto: CreateProjectDto, userId: string) {
    const projectExists = await this.prisma.project.findUnique({
      where: { title: dto.title }
    });

    if (projectExists) throw new BadRequestException('Project title already taken');

    return await this.prisma.project.create({
      data: {
        user: { connect: { id: userId } },
        ...dto
      }
    });
  }

  async getAllProjects() {
    // No need to pull from a User with userId
    // Because we always have a single administor user
    return await this.prisma.project.findMany();
  }

  async deleteProject(projectId: string) {
    const projectExists = await this.prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!projectExists) throw new BadRequestException('Project does not exist');

    await this.prisma.project.delete({
      where: { id: projectId }
    });
  }
}
