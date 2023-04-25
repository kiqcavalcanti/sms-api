import { RepositoryInterface } from '../Main/repository.interface';
import { BlackList } from '../../Entities/black-list.entity';

export interface BlacklistRepositoryInterface
  extends RepositoryInterface<BlackList> {
  findOneByPhoneNumber(phoneNumber: string): BlackList | Promise<BlackList>;
}
