import { MongoRepository } from 'typeorm';
import { TypeormBaseRepository } from './typeorm-base.repository';
import { BlackList } from '../../../../../Domain/Entities/black-list.entity';
import { BlacklistModel } from '../Models/blacklist.model';
import { BlacklistRepositoryInterface } from '../../../../../Domain/Repositories/Blacklist/blacklist.repository.interface';
import { BlacklistRepositoryConfiguration } from '../../../../../Domain/Repositories/Blacklist/blacklist.repository.configuration';

export class BlacklistMongoRepository
  extends TypeormBaseRepository<BlackList, BlacklistModel>
  implements BlacklistRepositoryInterface
{
  constructor(
    protected readonly repository: MongoRepository<BlacklistModel>,
    protected readonly repositoryConfiguration: BlacklistRepositoryConfiguration,
  ) {
    super(repository, repositoryConfiguration);
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<BlackList> {
    const blacklist = await this.repository.findOne({
      where: { phone_number: phoneNumber },
    });

    return blacklist?.toEntity();
  }
}
