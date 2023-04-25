import { JsonResource } from './json.resource';
import { BlackListGroupAsJson } from '../../../Domain/Entities/black-list-group.entity';

type toObjectData = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  name: string;
};

type InputData = BlackListGroupAsJson;
export class BlackListGroupResource extends JsonResource<
  InputData,
  toObjectData
> {
  protected toObject(item: InputData): toObjectData {
    return {
      id: item.id,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
      active: item.active,
      name: item.name,
    };
  }
}
