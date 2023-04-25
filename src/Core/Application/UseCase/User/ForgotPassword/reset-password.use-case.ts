import { UseCase } from '../../use-case';
import { PasswordResetRepositoryInterface } from '../../../../Domain/Repositories/PasswordReset/password-reset.repository.interface';
import { UserRepositoryInterface } from '../../../../Domain/Repositories/User/user.repository.interface';
import { DomainValidationException } from '../../../../Domain/Exceptions/domain-validation.exception';
import { EncryptServiceInterface } from '../../../../Domain/Services/Encrypters/encrypt.service.interface';
import { ResetPasswordDtoInterface } from '../../../Dto/User/ForgotPassword/reset-password.dto.interface';

type Dto = ResetPasswordDtoInterface;
type OutputDto = boolean;

export class ResetPasswordUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly userRepository: UserRepositoryInterface,
    protected readonly passwordResetRepository: PasswordResetRepositoryInterface,
    protected readonly encryptService: EncryptServiceInterface,
  ) {}
  // @ts-ignore
  async execute(dto: Dto): Promise<OutputDto> {
    const user = await this.userRepository.findOneByEmail(dto.email);

    if (!user) {
      throw new DomainValidationException(['User not found with this email']);
    }

    const resetPassword =
      await this.passwordResetRepository.findOneByCodeAndUserId(
        dto.code,
        user.id,
      );

    if (!resetPassword) {
      throw new DomainValidationException(['Code not found or expired']);
    }

    const passwordHash = await this.encryptService.hash(dto.newPassword);

    user.changePassword(passwordHash);

    resetPassword.deactivate();

    await this.userRepository.update(user);

    await this.passwordResetRepository.update(resetPassword);

    return true;
  }
}
