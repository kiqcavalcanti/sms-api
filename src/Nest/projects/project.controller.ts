import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateProjectUseCase } from '../../Core/Application/UseCase/Project/create-project.use-case';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectResource } from '../../Core/Infra/Http/Resources/project.resource';

@Controller('/api/projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(protected readonly createUseCase: CreateProjectUseCase) {}

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    const data = await this.createUseCase.execute(dto.toPlainObject());

    return new ProjectResource(data).responseSingular();
  }
}
