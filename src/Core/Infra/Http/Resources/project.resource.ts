import { JsonResource } from './json.resource';
import { BlackListAsJson } from '../../../Domain/Entities/black-list.entity';
import { ProjectAsJson } from '../../../Domain/Entities/project-entity.types';

type toObjectData = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  name: string;
};

type InputData = ProjectAsJson;
export class ProjectResource extends JsonResource<InputData, toObjectData> {
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
