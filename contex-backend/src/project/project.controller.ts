import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) { }

  @Get()
  async getAll() {
    return this.projectService.getAllProjects();
  }

  @Post('create')
  async create(@Body() dto: CreateProjectDto, @Request() req) {
    return this.projectService.createProject(dto, req.user.id);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
