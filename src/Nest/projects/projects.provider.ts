import { UserMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/user.mongo.repository';
import { DataSource } from 'typeorm';
import { ProjectModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/project.model';
import { ProjectMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/project.mongo.repository';
import { ProjectRepositoryConfiguration } from '../../Core/Domain/Repositories/Project/project.repository.configuration';
import { CreateProjectUseCase } from '../../Core/Application/UseCase/Project/create-project.use-case';

export const PROJECT_REPOSITORIES = {
  TYPEORM_MONGO_REPOSITORY: {
    provide: UserMongoRepository,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getMongoRepository(ProjectModel);
      const repositoryConfiguration = new ProjectRepositoryConfiguration();
      return new ProjectMongoRepository(repository, repositoryConfiguration);
    },
    inject: [DataSource],
  },
};

export const PROJECT_USE_CASES = {
  CREATE_PROJECT: {
    provide: CreateProjectUseCase,
    useFactory: (repository: ProjectMongoRepository) => {
      return new CreateProjectUseCase(repository);
    },
    inject: [PROJECT_REPOSITORIES.TYPEORM_MONGO_REPOSITORY.provide],
  },
};
