import { MongoRepository } from 'typeorm';
import { TypeormBaseRepository } from './typeorm-base.repository';
import { ProjectRepositoryInterface } from '../../../../../Domain/Repositories/Project/project.repository.interface';
import { Project } from '../../../../../Domain/Entities/project.entity';
import { ProjectRepositoryConfiguration } from '../../../../../Domain/Repositories/Project/project.repository.configuration';
import { ProjectModel } from '../Models/project.model';

export class ProjectMongoRepository
  extends TypeormBaseRepository<Project, ProjectModel>
  implements ProjectRepositoryInterface
{
  protected defaultSelect = [];
  constructor(
    protected readonly repository: MongoRepository<ProjectModel>,
    protected readonly repositoryConfiguration: ProjectRepositoryConfiguration,
  ) {
    super(repository, repositoryConfiguration);
  }

  async findOneByName(name: string): Promise<Project> {
    const projectModel = await this.repository.findOne({
      where: { name },
    });

    return projectModel?.toEntity();
  }
}
