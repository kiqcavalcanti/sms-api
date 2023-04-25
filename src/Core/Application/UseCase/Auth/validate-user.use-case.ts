import { UseCase } from '../use-case';
import { UserRepositoryInterface } from '../../../Domain/Repositories/User/user.repository.interface';
import { EncryptServiceInterface } from '../../../Domain/Services/Encrypters/encrypt.service.interface';
import { ValidateUserInterfaceDto } from '../../Dto/Auth/validate-user.interface.dto';

type Dto = ValidateUserInterfaceDto;
type OutputDto = { id: string; name: string };

export class ValidateUserUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly userRepository: UserRepositoryInterface,
    protected readonly encryptService: EncryptServiceInterface,
  ) {}
  async execute(input: Dto): Promise<OutputDto> {
    const user = await this.userRepository.findOneByEmail(input.email);

    if (!user) {
      return null;
    }

    const passwordMatch = await this.encryptService.compare(
      input.password,
      user.password,
    );

    if (!passwordMatch) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
    };
  }
}
