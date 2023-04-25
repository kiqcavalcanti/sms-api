import { EntityValidationException } from '../Exceptions/entity-validation.exception';
import { uuidV4 } from '../../Infra/Helpers/custom.helpers';
import { JoiValidatorItem } from '../../Infra/Validators/Joi/joi.validator.item';
export abstract class BaseEntity {
  protected primary: string;
  protected constructor(
    protected readonly _id: string = uuidV4(),
    protected readonly _createdAt: Date | string = new Date(),
    protected _updatedAt: Date | string = new Date(),
    protected _active: boolean = true,
  ) {
    this._createdAt =
      typeof this._createdAt === 'string'
        ? new Date(this._createdAt)
        : this._createdAt;

    if (isNaN(this._createdAt as any)) {
      throw new EntityValidationException([
        'created_at should be a valid date',
      ]);
    }

    this.updatedAt = _updatedAt;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt as Date;
  }

  get updatedAt(): Date {
    return this._updatedAt as Date;
  }

  set updatedAt(date: Date | string) {
    this._updatedAt =
      typeof this._updatedAt === 'string' ? new Date(date) : date;

    if (isNaN(this._updatedAt as any)) {
      throw new EntityValidationException([
        'updated_at should be a valid date',
      ]);
    }
  }

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  setPrimary(primary: string) {
    this.primary = primary;
  }

  getPrimary() {
    return this.primary;
  }

  abstract toJson(): any;

  test() {
    return [
      new JoiValidatorItem('id').string().required(),
      new JoiValidatorItem('name').string().required(),
    ];
  }
}
