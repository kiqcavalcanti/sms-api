import { Module } from '@nestjs/common';
import { PROJECT_REPOSITORIES, PROJECT_USE_CASES } from './projects.provider';
import { ProjectController } from './project.controller';

@Module({
  controllers: [ProjectController],
  providers: [
    ...Object.values(PROJECT_USE_CASES),
    ...Object.values(PROJECT_REPOSITORIES),
  ],
})
export class ProjectsModule {}
