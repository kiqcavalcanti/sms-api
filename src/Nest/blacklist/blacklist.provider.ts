import { DataSource } from 'typeorm';
import { BlacklistMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/blacklist.mongo.repository';
import { BlacklistModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/blacklist.model';
import { BlacklistRepositoryConfiguration } from '../../Core/Domain/Repositories/Blacklist/blacklist.repository.configuration';
import { BlacklistGroupMongoRepository } from '../../Core/Infra/Database/Typeorm/Mongodb/Repositories/blacklist-group.mongo.repository';
import { BlackListGroupRepositoryConfiguration } from '../../Core/Domain/Repositories/BlackListGroup/black-list-group.repository.configuration';
import { CreateBlackListGroupUseCase } from '../../Core/Application/UseCase/Blacklist/create-black-list-group.use-case';
import { BlacklistGroupModel } from '../../Core/Infra/Database/Typeorm/Mongodb/Models/blacklist-group.model';
import { CreateBlacklistUseCase } from '../../Core/Application/UseCase/Blacklist/create-blacklist.use-case';
import { ListBlacklistUseCase } from '../../Core/Application/UseCase/Blacklist/list-blacklist.use-case';
import { ListBlacklistGroupUseCase } from '../../Core/Application/UseCase/Blacklist/list-blacklist-group.use-case';

export const BLACKLIST_REPOSITORIES = {
  TYPEORM_BLACKLIST_MONGO_REPOSITORY: {
    provide: BlacklistMongoRepository,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getMongoRepository(BlacklistModel);
      const repositoryConfiguration = new BlacklistRepositoryConfiguration();
      return new BlacklistMongoRepository(repository, repositoryConfiguration);
    },
    inject: [DataSource],
  },

  TYPEORM_BLACKLIST_GROUP_MONGO_REPOSITORY: {
    provide: BlacklistGroupMongoRepository,
    useFactory: (dataSource: DataSource) => {
      const repository = dataSource.getMongoRepository(BlacklistGroupModel);
      const blackListRepository = dataSource.getMongoRepository(BlacklistModel);
      const repositoryConfiguration =
        new BlackListGroupRepositoryConfiguration();
      return new BlacklistGroupMongoRepository(
        repository,
        blackListRepository,
        repositoryConfiguration,
      );
    },
    inject: [DataSource],
  },
};

export const BLACKLIST_USE_CASES = {
  CREATE_BLACKLIST_GROUP: {
    provide: CreateBlackListGroupUseCase,
    useFactory: (repository: BlacklistGroupMongoRepository) => {
      return new CreateBlackListGroupUseCase(repository);
    },
    inject: [
      BLACKLIST_REPOSITORIES.TYPEORM_BLACKLIST_GROUP_MONGO_REPOSITORY.provide,
    ],
  },
  CREATE_BLACKLIST: {
    provide: CreateBlacklistUseCase,
    useFactory: (
      blacklistGroupRep: BlacklistGroupMongoRepository,
      blacklistRep: BlacklistMongoRepository,
    ) => {
      return new CreateBlacklistUseCase(blacklistRep, blacklistGroupRep);
    },
    inject: [
      BLACKLIST_REPOSITORIES.TYPEORM_BLACKLIST_GROUP_MONGO_REPOSITORY.provide,
      BLACKLIST_REPOSITORIES.TYPEORM_BLACKLIST_MONGO_REPOSITORY.provide,
    ],
  },

  LIST_BLACKLIST: {
    provide: ListBlacklistUseCase,
    useFactory: (repository: BlacklistGroupMongoRepository) => {
      return new ListBlacklistUseCase(repository);
    },
    inject: [
      BLACKLIST_REPOSITORIES.TYPEORM_BLACKLIST_GROUP_MONGO_REPOSITORY.provide,
    ],
  },

  LIST_BLACKLIST_GROUP: {
    provide: ListBlacklistGroupUseCase,
    useFactory: (repository: BlacklistGroupMongoRepository) => {
      return new ListBlacklistGroupUseCase(repository);
    },
    inject: [
      BLACKLIST_REPOSITORIES.TYPEORM_BLACKLIST_GROUP_MONGO_REPOSITORY.provide,
    ],
  },
};
