import { UseCase } from '../use-case';
import { TokenServiceInterface } from '../../../Domain/Services/Authentication/Token.service.interface';
import { GenerateTokenInterfaceDto } from '../../Dto/Auth/generate-token.interface.dto';

type Dto = GenerateTokenInterfaceDto;

type OutputDto = string;

export class GenerateTokenUseCase implements UseCase<Dto, OutputDto> {
  constructor(protected readonly tokenService: TokenServiceInterface) {}

  execute(input: Dto): OutputDto | Promise<OutputDto> {
    return this.tokenService.generateToken(input);
  }
}
