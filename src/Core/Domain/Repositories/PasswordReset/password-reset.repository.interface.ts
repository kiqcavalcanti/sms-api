import { RepositoryInterface } from '../Main/repository.interface';
import { PasswordReset } from '../../Entities/password-reset.entity';

export interface PasswordResetRepositoryInterface
  extends RepositoryInterface<PasswordReset> {
  findOneByCodeAndUserId(
    code: string,
    userId: string,
  ): Promise<PasswordReset> | PasswordReset;
}
