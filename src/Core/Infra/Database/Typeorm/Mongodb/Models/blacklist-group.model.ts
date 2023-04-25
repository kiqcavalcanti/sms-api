import { Entity, Column, Index } from 'typeorm';
import { BaseModel } from './base.model';
import { BlackListGroup } from '../../../../../Domain/Entities/black-list-group.entity';
import { BlacklistModel } from './blacklist.model';

@Entity('blacklist_groups')
export class BlacklistGroupModel extends BaseModel<BlackListGroup> {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  owner_user_id: string;

  @Column(() => BlacklistModel)
  blacklists: BlacklistModel[] = [];

  async toEntity(relations = ['blacklists']) {
    let blacklists: BlacklistModel[] = [];

    if (relations.includes('blacklists')) {
      blacklists = this.blacklists;
    }

    const blackListGroup = new BlackListGroup({
      name: this.name,
      ownerUserId: this.owner_user_id,
      id: this.id,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      active: this.active,
    });

    blackListGroup.setPrimary(this._id.toString());

    blackListGroup.blacklists = blacklists.map((b) => b.toEntity());

    return blackListGroup;
  }
}
