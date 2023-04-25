import { BaseEntity } from './base.entity';
import { SnakeCaseKeys } from '../Types/types';
import { BlackList } from './black-list.entity';

export type BlackListGroupAsJson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  ownerUserId: string;
  blacklists: BlackList[];
};

type BlackListGroupProperties = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active?: boolean;
  name: string;
  ownerUserId: string;
};

type UpdateData = {
  name?: string;
};

export type BlackListGroupAsSnakeCaseJson = SnakeCaseKeys<BlackListGroupAsJson>;

export class BlackListGroup extends BaseEntity {
  protected _blacklists: BlackList[] = [];
  constructor(protected readonly props: BlackListGroupProperties) {
    super(props.id, props.createdAt, props.updatedAt, props.active);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get ownerUserId(): string {
    return this.props.ownerUserId;
  }

  set ownerUserId(userId: string) {
    this.props.ownerUserId = userId;
  }

  set blacklists(blackLists: BlackList[]) {
    this._blacklists = blackLists;
  }

  get blacklists() {
    return this._blacklists;
  }

  addBlacklist(blacklist: BlackList) {
    this._blacklists.push(blacklist);
  }

  toJson(): BlackListGroupAsJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.isActive(),
      name: this.name,
      ownerUserId: this.ownerUserId,
      blacklists: this.blacklists,
    };
  }
}
