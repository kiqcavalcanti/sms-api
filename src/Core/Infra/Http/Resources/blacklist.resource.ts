import { JsonResource } from './json.resource';
import { BlackListAsJson } from '../../../Domain/Entities/black-list.entity';

type toObjectData = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  phone_number: string;
};

type InputData = BlackListAsJson;
export class BlackListResource extends JsonResource<InputData, toObjectData> {
  protected toObject(item: InputData): toObjectData {
    return {
      id: item.id,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
      active: item.active,
      phone_number: item.phoneNumber,
    };
  }
}
