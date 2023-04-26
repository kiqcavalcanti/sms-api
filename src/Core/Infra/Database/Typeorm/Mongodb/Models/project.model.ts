import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';
import { Project } from '../../../../../Domain/Entities/project.entity';
import { SendTypeEnum } from '../../../../../Domain/Enums/send-type.enum';
import {
  Schedule,
  TargetFilters,
} from '../../../../../Domain/Entities/project-entity.types';

@Entity('projects')
export class ProjectModel extends BaseModel<Project> {
  @Column()
  name: string;

  @Column()
  owner_user_id: string;

  @Column()
  message: string;

  @Column()
  send_type: SendTypeEnum;

  @Column()
  title: string;

  @Column()
  target_filters: TargetFilters;

  @Column()
  schedule: Schedule;

  toEntity(relations = []) {
    const project = new Project({
      id: this.id,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      active: this.active,
      name: this.name,
      ownerUserId: this.owner_user_id,
      message: this.message,
      schedule: this.schedule,
      sendType: this.send_type,
      title: this.title,
      targetFilters: this.target_filters,
    });

    project.setPrimary(this._id.toString());

    return project;
  }
}
