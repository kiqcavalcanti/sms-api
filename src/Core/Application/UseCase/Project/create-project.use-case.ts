import { UseCase } from '../use-case';
import { CreateProjectDtoInterface } from '../../Dto/Project/create-project.dto.interface';
import { ProjectAsJson } from '../../../Domain/Entities/project-entity.types';
import { ProjectRepositoryInterface } from '../../../Domain/Repositories/Project/project.repository.interface';
import { DomainValidationException } from '../../../Domain/Exceptions/domain-validation.exception';
import { Project } from '../../../Domain/Entities/project.entity';

type Dto = CreateProjectDtoInterface;
type OutputDto = ProjectAsJson;
export class CreateProjectUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  async execute(dto: Dto): Promise<OutputDto> {
    const projectGroupExists = await this.projectRepository.findOneByName(
      dto.name,
    );

    if (projectGroupExists) {
      throw new DomainValidationException([
        'Project already exists with this name',
      ]);
    }

    const project = new Project({
      name: dto.name,
      ownerUserId: dto.ownerUserId,
      message: dto.message,
      schedule: dto.schedule,
      sendType: dto.sendType,
      title: dto.title,
      targetFilters: dto.targetFilters,
    });

    this.projectRepository.insert(project);

    return project.toJson();
  }
}
