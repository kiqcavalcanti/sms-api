import { UserMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/user.mongo.repository';
import { UserModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/user.model';
import { UserRepositoryConfiguration } from '../../Core/Domain/Repositories/User/user.repository.configuration';
import { DataSource } from 'typeorm';
import { CreateUserUseCase } from '../../Core/Application/UseCase/User/create-user.use-case';
import { BcryptService } from '../../Core/Infra/Services/Encrypters/bcrypt';
// import { ListApplicationUseCase } from '../Core/Application/UseCase/User/list-application.use-case';
// import { CreateApplicationUseCase } from '../Core/Application/UseCase/User/create-application.use-case';
// import { UpdateApplicationUseCase } from '../Core/Application/UseCase/User/update-application.use-case';
// import { ActivateApplicationUseCase } from '../Core/Application/UseCase/User/activate-application.use-case';
// import { ShowApplicationUseCase } from '../Core/Application/UseCase/User/show-application.use-case';
// import { InactivateApplicationUseCase } from '../Core/Application/UseCase/User/inactivate-application.use-case';

export const USER_REPOSITORIES = {
  TYPEORM_MONGO_REPOSITORY: {
    provide: UserMongoRepository,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getMongoRepository(UserModel);
      const repositoryConfiguration = new UserRepositoryConfiguration();
      return new UserMongoRepository(repository, repositoryConfiguration);
    },
    inject: [DataSource],
  },
};

export const USER_USE_CASES = {
  // LIST_APPLICATION_USE_CASE: {
  //   provide: ListApplicationUseCase,
  //   useFactory: (repository: ApplicationTypeormMongoRepository) => {
  //     return new ListApplicationUseCase(repository);
  //   },
  //   inject: [
  //     APPLICATIONS_REPOSITORIES.APPLICATION_TYPEORM_MONGO_REPOSITORY.provide,
  //   ],
  // },
  // SHOW_APPLICATION_USE_CASE: {
  //   provide: ShowApplicationUseCase,
  //   useFactory: (repository: ApplicationTypeormMongoRepository) => {
  //     return new ShowApplicationUseCase(repository);
  //   },
  //   inject: [
  //     APPLICATIONS_REPOSITORIES.APPLICATION_TYPEORM_MONGO_REPOSITORY.provide,
  //   ],
  // },
  CREATE_USER: {
    provide: CreateUserUseCase,
    useFactory: (repository: UserMongoRepository) => {
      const encryptService = new BcryptService();
      return new CreateUserUseCase(repository, encryptService);
    },
    inject: [USER_REPOSITORIES.TYPEORM_MONGO_REPOSITORY.provide],
  },
  // UPDATE_APPLICATION_USE_CASE: {
  //   provide: UpdateApplicationUseCase,
  //   useFactory: (repository: ApplicationTypeormMongoRepository) => {
  //     return new UpdateApplicationUseCase(repository);
  //   },
  //   inject: [
  //     APPLICATIONS_REPOSITORIES.APPLICATION_TYPEORM_MONGO_REPOSITORY.provide,
  //   ],
  // },
  // ACTIVATE_APPLICATION_USE_CASE: {
  //   provide: ActivateApplicationUseCase,
  //   useFactory: (repository: ApplicationTypeormMongoRepository) => {
  //     return new ActivateApplicationUseCase(repository);
  //   },
  //   inject: [
  //     APPLICATIONS_REPOSITORIES.APPLICATION_TYPEORM_MONGO_REPOSITORY.provide,
  //   ],
  // },
  // INACTIVATE_APPLICATION_USE_CASE: {
  //   provide: InactivateApplicationUseCase,
  //   useFactory: (repository: ApplicationTypeormMongoRepository) => {
  //     return new InactivateApplicationUseCase(repository);
  //   },
  //   inject: [
  //     APPLICATIONS_REPOSITORIES.APPLICATION_TYPEORM_MONGO_REPOSITORY.provide,
  //   ],
  // },
};
