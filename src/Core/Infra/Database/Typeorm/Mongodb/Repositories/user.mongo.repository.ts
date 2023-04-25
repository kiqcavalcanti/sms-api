import { UserModel } from '../Models/user.model';
import { MongoRepository } from 'typeorm';
import { TypeormBaseRepository } from './typeorm-base.repository';
import { User } from '../../../../../Domain/Entities/user.entity';
import { UserRepositoryConfiguration } from '../../../../../Domain/Repositories/User/user.repository.configuration';
import { UserRepositoryInterface } from '../../../../../Domain/Repositories/User/user.repository.interface';

export class UserMongoRepository
  extends TypeormBaseRepository<User, UserModel>
  implements UserRepositoryInterface
{
  constructor(
    protected readonly repository: MongoRepository<UserModel>,
    protected readonly repositoryConfiguration: UserRepositoryConfiguration,
  ) {
    super(repository, repositoryConfiguration);
  }

  async findOneByEmail(email: string): Promise<User> {
    const userModel = await this.repository.findOne({
      where: { email },
    });

    return userModel?.toEntity();
  }
}
