import { RepositoryInterface } from '../Main/repository.interface';
import { Project } from '../../Entities/project.entity';

export interface ProjectRepositoryInterface
  extends RepositoryInterface<Project> {
  findOneByName(name: string): Project | Promise<Project>;
}
