import { BaseEntity } from './base.entity';
import { SnakeCaseKeys } from '../Types/types';

export type BlackListAsJson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  phoneNumber: string;
};

type BlackListProperties = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active?: boolean;
  phoneNumber: string;
};

type UpdateData = {
  phoneNumber?: string;
};

export type BlackListAsSnakeCaseJson = SnakeCaseKeys<BlackListAsJson>;

export class BlackList extends BaseEntity {
  constructor(protected readonly props: BlackListProperties) {
    super(props.id, props.createdAt, props.updatedAt, props.active);
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
  }

  toJson(): BlackListAsJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.isActive(),
      phoneNumber: this.phoneNumber,
    };
  }
}
