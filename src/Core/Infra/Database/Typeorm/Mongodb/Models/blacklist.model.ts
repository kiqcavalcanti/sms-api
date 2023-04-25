import { Entity, Column } from 'typeorm';
import { BaseModel } from './base.model';
import { BlackList } from '../../../../../Domain/Entities/black-list.entity';

@Entity('blacklists')
export class BlacklistModel extends BaseModel<BlackList> {
  @Column()
  phone_number: string;

  toEntity(relations = []) {
    const blacklist = new BlackList({
      id: this.id,
      phoneNumber: this.phone_number,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      active: this.active,
    });

    blacklist.setPrimary(this._id.toString());

    return blacklist;
  }
}
