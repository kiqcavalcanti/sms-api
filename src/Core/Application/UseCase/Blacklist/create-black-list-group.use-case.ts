import { UseCase } from '../use-case';
import { CreateBlacklistGroupDtoInterface } from '../../Dto/Blacklist/create-blacklist-group.dto.interface';
import {
  BlackListGroup,
  BlackListGroupAsJson,
} from '../../../Domain/Entities/black-list-group.entity';
import { BlackListGroupRepositoryInterface } from '../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';
import { DomainValidationException } from '../../../Domain/Exceptions/domain-validation.exception';

type Dto = CreateBlacklistGroupDtoInterface;
type OutputDto = BlackListGroupAsJson;
export class CreateBlackListGroupUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly blackListGroupRepository: BlackListGroupRepositoryInterface,
  ) {}

  async execute(dto: Dto): Promise<OutputDto> {
    const blackListGroupExists =
      await this.blackListGroupRepository.findOneByName(dto.name);

    if (blackListGroupExists) {
      throw new DomainValidationException([
        'Blacklist already exists with this name',
      ]);
    }

    const blackListGroup = new BlackListGroup({
      name: dto.name,
      ownerUserId: dto.ownerUserId,
    });

    this.blackListGroupRepository.insert(blackListGroup);

    return blackListGroup.toJson();
  }
}
