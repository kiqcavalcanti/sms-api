import { BaseEntity } from './base.entity';
import {
  ProjectAsJson,
  UpdateData,
  ProjectProperties,
} from './project-entity.types';

export class Project extends BaseEntity {
  constructor(protected readonly props: ProjectProperties) {
    super(props.id, props.createdAt, props.updatedAt, props.active);
  }
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  update(data: UpdateData) {
    this.updatedAt = new Date();
  }

  toJson(): ProjectAsJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.isActive(),
      name: this.name,
    };
  }
}
