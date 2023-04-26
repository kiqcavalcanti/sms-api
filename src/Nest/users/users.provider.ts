import { UserMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/user.mongo.repository';
import { UserModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/user.model';
import { UserRepositoryConfiguration } from '../../Core/Domain/Repositories/User/user.repository.configuration';
import { DataSource } from 'typeorm';
import { CreateUserUseCase } from '../../Core/Application/UseCase/User/create-user.use-case';
import { BcryptService } from '../../Core/Infra/Services/Encrypters/bcrypt';

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
  CREATE_USER: {
    provide: CreateUserUseCase,
    useFactory: (repository: UserMongoRepository) => {
      const encryptService = new BcryptService();
      return new CreateUserUseCase(repository, encryptService);
    },
    inject: [USER_REPOSITORIES.TYPEORM_MONGO_REPOSITORY.provide],
  },
};
