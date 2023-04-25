import { UseCase } from '../../use-case';
import { ValidateForgotPasswordCodeDtoInterface } from '../../../Dto/User/ForgotPassword/validate-forgot-password-code.dto.interface';
import { PasswordResetRepositoryInterface } from '../../../../Domain/Repositories/PasswordReset/password-reset.repository.interface';
import { UserRepositoryInterface } from '../../../../Domain/Repositories/User/user.repository.interface';
import { DomainValidationException } from '../../../../Domain/Exceptions/domain-validation.exception';

type Dto = ValidateForgotPasswordCodeDtoInterface;
type OutputDto = boolean;

export class ValidateForgotPasswordCodeUseCase
  implements UseCase<Dto, OutputDto>
{
  constructor(
    protected readonly userRepository: UserRepositoryInterface,
    protected readonly passwordResetRepository: PasswordResetRepositoryInterface,
  ) {}
  // @ts-ignore
  async execute(dto: Dto): Promise<OutputDto> {
    const user = await this.userRepository.findOneByEmail(dto.email);

    if (!user) {
      throw new DomainValidationException(['User not found with this email']);
    }

    const reset = await this.passwordResetRepository.findOneByCodeAndUserId(
      dto.code,
      user.id,
    );

    if (!reset) {
      throw new DomainValidationException(['Code not found or expired']);
    }

    return true;
  }
}
