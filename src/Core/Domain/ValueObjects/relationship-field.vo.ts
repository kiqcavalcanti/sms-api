import { BaseValueObject } from './base.value-object';

type Value = {
  relationshipName: string;
  originColumnName: string;
};
export class RelationshipField extends BaseValueObject<Value> {
  get relationshipName(): string {
    return this.value.relationshipName;
  }

  get originColumnName(): string {
    return this.value.originColumnName;
  }
}
