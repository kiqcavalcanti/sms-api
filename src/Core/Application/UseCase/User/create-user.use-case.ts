import { UseCase } from '../use-case';
import { CreateUserDtoInterface } from '../../Dto/User/create-user.dto.interface';
import { User, UserAsJson } from '../../../Domain/Entities/user.entity';
import { UserRepositoryInterface } from '../../../Domain/Repositories/User/user.repository.interface';
import { DomainValidationException } from '../../../Domain/Exceptions/domain-validation.exception';
import { EncryptServiceInterface } from '../../../Domain/Services/Encrypters/encrypt.service.interface';

type Dto = CreateUserDtoInterface;
type OutputDto = UserAsJson;

export class CreateUserUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly userRepository: UserRepositoryInterface,
    protected readonly encryptService: EncryptServiceInterface,
  ) {}
  async execute(dto: Dto): Promise<OutputDto> {
    const userAlreadyExists = await this.userRepository.findOneByEmail(
      dto.email,
    );

    if (userAlreadyExists) {
      throw new DomainValidationException([
        'user already exists with this email',
      ]);
    }

    const user = new User({
      name: dto.name,
      email: dto.email,
      password: await this.encryptService.hash(dto.password),
    });

    await this.userRepository.insert(user);

    return user.toJson();
  }
}
