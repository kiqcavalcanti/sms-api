import { UserMongoRepository as ApplicationTypeormMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/user.mongo.repository';
import { UserModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/user.model';
import { UserRepositoryConfiguration } from '../../Core/Domain/Repositories/User/user.repository.configuration';
import { DataSource } from 'typeorm';
import { ValidateUserUseCase } from '../../Core/Application/UseCase/Auth/validate-user.use-case';
import { BcryptService } from '../../Core/Infra/Services/Encrypters/bcrypt';
import { JwtTokenService } from '../../Core/Infra/Services/Authentication/jwt-token.service';
import { GenerateTokenUseCase } from '../../Core/Application/UseCase/Auth/generate-token.use-case';

export const AUTH_REPOSITORIES = {
  USERS_TYPEORM_MONGO_REPOSITORY: {
    provide: 'UserMongoRepository',
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getMongoRepository(UserModel);
      const repositoryConfiguration = new UserRepositoryConfiguration();
      return new ApplicationTypeormMongoRepository(
        repository,
        repositoryConfiguration,
      );
    },
    inject: [DataSource],
  },
};

export const AUTH_USE_CASES = {
  VALIDATE_USER_USE_CASE: {
    provide: ValidateUserUseCase,
    useFactory: (repository: ApplicationTypeormMongoRepository) => {
      const encryptService = new BcryptService();

      return new ValidateUserUseCase(repository, encryptService);
    },
    inject: [AUTH_REPOSITORIES.USERS_TYPEORM_MONGO_REPOSITORY.provide],
  },

  GENERATE_TOKEN_USE_CASE: {
    provide: GenerateTokenUseCase,
    useFactory: () => {
      const tokenService = new JwtTokenService();
      return new GenerateTokenUseCase(tokenService);
    },
  },
};
