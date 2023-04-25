import { JsonResource } from './json.resource';
import { PaginateByBlackListItems } from '../../../Domain/Repositories/BlackListGroup/black-list-group.repository.interface';

type toObjectData = {
  group_id: string;
  group_name: string;
  phone_number: string;
  blacklist_id: string;
};

type InputData = PaginateByBlackListItems;
export class ListBlackListResource extends JsonResource<
  InputData,
  toObjectData
> {
  protected toObject(item: InputData): toObjectData {
    return {
      group_id: item.id,
      group_name: item.name,
      phone_number: item.phoneNumber,
      blacklist_id: item.blacklistId,
    };
  }
}
