import { BaseValueObject } from './base.value-object';
import { VariableTypeEnum } from '../Enums/variable-type.enum';
import { RelationshipField } from './relationship-field.vo';

type Value = {
  name: string;
  type: VariableTypeEnum;
  relationshipField?: RelationshipField;
};
export class FilterableField extends BaseValueObject<Value> {
  get name(): string {
    return this.value.name;
  }

  get type(): VariableTypeEnum {
    return this.value.type;
  }

  get relationshipField(): any {
    return this.value.relationshipField;
  }
}
