import { Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { BaseEntity } from '../../../../../Domain/Entities/base.entity';

export abstract class BaseModel<Entity extends BaseEntity = any> {
  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column({ generated: 'uuid', default: uuidV4, unique: true })
  id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  active: boolean;

  abstract toEntity(relations?: string[]): Entity | Promise<Entity>;
}
