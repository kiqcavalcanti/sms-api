import { RepositoryInterface } from '../Main/repository.interface';
import { User } from '../../Entities/user.entity';

export interface UserRepositoryInterface extends RepositoryInterface<User> {
  findOneByEmail(email: string): Promise<User> | User;
}
