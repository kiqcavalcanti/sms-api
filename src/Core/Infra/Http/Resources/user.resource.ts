import { UserAsJson } from '../../../Domain/Entities/user.entity';
import { JsonResource } from './json.resource';

type toObjectData = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  name: string;
  email: string;
};

type InputData = UserAsJson;
export class UserResource extends JsonResource<InputData, toObjectData> {
  protected toObject(item: InputData): toObjectData {
    return {
      id: item.id,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
      active: item.active,
      name: item.name,
      email: item.email,
    };
  }
}
