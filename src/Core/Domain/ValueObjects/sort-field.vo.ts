import { SortEnum } from '../Enums/sort.enum';
import { BaseValueObject } from './base.value-object';

type Value = {
  field: string;
  direction: SortEnum;
};
export class SortFieldVo extends BaseValueObject<Value> {
  get field(): string {
    return this.value.field;
  }

  get sortDirection(): SortEnum {
    return this.value.direction;
  }
}
