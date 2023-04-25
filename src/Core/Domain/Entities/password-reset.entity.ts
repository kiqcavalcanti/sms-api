import { BaseEntity } from './base.entity';
import { SnakeCaseKeys } from '../Types/types';
import { EntityValidationException } from '../Exceptions/entity-validation.exception';

export type PasswordResetAsJson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  code: string;
  userId: string;
  expiresAt: Date;
};

type UserProperties = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active?: boolean;
  code: string;
  userId: string;
  expiresAt: string | Date;
};

type UpdateData = {
  expiresAt?: string | Date;
};

export type PasswordResetAsSnakeCaseJson = SnakeCaseKeys<PasswordResetAsJson>;

export class PasswordReset extends BaseEntity {
  constructor(protected readonly props: UserProperties) {
    super(props.id, props.createdAt, props.updatedAt, props.active);
  }
  get code(): string {
    return this.props.code;
  }

  set code(code: string) {
    this.props.code = code;
  }

  get userId(): string {
    return this.props.userId;
  }

  set userId(userId: string) {
    this.props.userId = userId;
  }

  get expiresAt(): Date {
    return this.props.expiresAt as Date;
  }

  set expiresAt(date: Date | string) {
    this.props.expiresAt =
      typeof this.props.expiresAt === 'string' ? new Date(date) : date;

    if (isNaN(this.props.expiresAt as any)) {
      throw new EntityValidationException([
        'expires_at should be a valid date',
      ]);
    }
  }

  update(data: UpdateData) {
    if (typeof data.expiresAt !== 'undefined') {
      this.expiresAt = data.expiresAt;
    }

    this.updatedAt = new Date();
  }

  toJson(): PasswordResetAsJson {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      active: this.isActive(),
      expiresAt: this.expiresAt,
      code: this.code,
      userId: this.userId,
    };
  }
}
