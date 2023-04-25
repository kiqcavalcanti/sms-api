import { BaseEntity } from './base.entity';
import { SnakeCaseKeys } from '../Types/types';

export type UserAsJson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
  email: string;
  password: string;
};

type UserProperties = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active?: boolean;
  name: string;
  email: string;
  password: string;
};

type UpdateData = {
  name?: string;
  email?: string;
};

export type UserAsSnakeCaseJson = SnakeCaseKeys<UserAsJson>;

export class User extends BaseEntity {
  constructor(protected readonly props: UserProperties) {
    super(props.id, props.createdAt, props.updatedAt, props.active);
  }
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  update(data: UpdateData) {
    if (typeof data.name !== 'undefined') {
      this.name = data.name;
    }

    if (typeof data.email !== 'undefined') {
      this.email = data.email;
    }

    this.updatedAt = new Date();
  }

  changePassword(password: string) {
    this.password = password;
  }

  toJson(): UserAsJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.isActive(),
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
