import { UseCase } from '../../use-case';
import { UserRepositoryInterface } from '../../../../Domain/Repositories/User/user.repository.interface';
import { PasswordReset } from '../../../../Domain/Entities/password-reset.entity';
import { generateRandomString } from '../../../../Domain/Helpers/random.string';
import { ForgotPasswordDtoInterface } from '../../../Dto/User/ForgotPassword/forgot-password.dto.interface';

type Dto = ForgotPasswordDtoInterface;
type OutputDto = boolean;

export class ForgotPasswordUseCase implements UseCase<Dto, OutputDto> {
  constructor(protected readonly userRepository: UserRepositoryInterface) {}
  async execute(dto: Dto): Promise<OutputDto> {
    const userAlreadyExists = await this.userRepository.findOneByEmail(
      dto.email,
    );

    if (!userAlreadyExists) {
      return false;
    }

    const passwordReset = new PasswordReset({
      code: generateRandomString(8),
      expiresAt: new Date(new Date().getMinutes() + 10),
      userId: userAlreadyExists.id,
    });

    //@todo send email or sms with a service
    console.log(passwordReset.code);

    return true;
  }
}
