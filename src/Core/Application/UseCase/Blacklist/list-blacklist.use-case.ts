import { UseCase } from '../use-case';
import {
  BlackListGroupRepositoryInterface,
  PaginateByBlackListResult,
} from '../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';
import { ListBlacklistDtoInterface } from '../../Dto/Blacklist/list-blacklist.dto.interface';

type Dto = ListBlacklistDtoInterface;
type OutputDto = PaginateByBlackListResult;
export class ListBlacklistUseCase implements UseCase<Dto, OutputDto> {
  constructor(
    protected readonly blackListGroupRepository: BlackListGroupRepositoryInterface,
  ) {}

  async execute(dto: Dto): Promise<OutputDto> {
    return this.blackListGroupRepository.paginateByBlackList(
      dto.ownerUserId,
      dto.search,
      dto.page,
    );
  }
}
