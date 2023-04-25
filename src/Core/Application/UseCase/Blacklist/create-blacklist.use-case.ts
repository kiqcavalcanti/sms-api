import { UseCase } from '../use-case';
import {
  BlackList,
  BlackListAsJson,
} from '../../../Domain/Entities/black-list.entity';
import { BlackListGroupRepositoryInterface } from '../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';
import { BlacklistRepositoryInterface } from '../../../Domain/Repositories/Blacklist/blacklist.repository.interface';
import { CreateBlacklistDtoInterface } from '../../Dto/Blacklist/create-blacklist.dto.interface';

type Dto = CreateBlacklistDtoInterface;
type OutputDto = BlackListAsJson;
export class CreateBlacklistUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly blackListRepository: BlacklistRepositoryInterface,
    protected readonly blackListGroupRepository: BlackListGroupRepositoryInterface,
  ) {}

  async execute(dto: Dto): Promise<OutputDto> {
    let blackList = await this.blackListRepository.findOneByPhoneNumber(
      dto.phoneNumber,
    );

    if (!blackList) {
      blackList = new BlackList({
        phoneNumber: dto.phoneNumber,
      });

      await this.blackListRepository.insert(blackList);
    }

    for (const groupId of dto.groupIds) {
      await this.blackListGroupRepository.addBlacklist(groupId, blackList);
    }

    return blackList.toJson();
  }
}
