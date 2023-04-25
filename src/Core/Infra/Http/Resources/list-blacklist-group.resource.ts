import { JsonResource } from './json.resource';
import { PaginateItems } from '../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';

type toObjectData = {
  id: string;
  name: string;
  blacklist_count: number;
};

type InputData = PaginateItems;
export class ListBlacklistGroupResource extends JsonResource<
  InputData,
  toObjectData
> {
  protected toObject(item: InputData): toObjectData {
    return {
      id: item.id,
      name: item.name,
      blacklist_count: item.blacklistCount,
    };
  }
}
