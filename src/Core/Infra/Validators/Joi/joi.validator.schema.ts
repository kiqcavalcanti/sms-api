import { SchemaValidatorInterface } from '../../../Domain/Validator/schema.validator.interface';
import { ItemValidatorInterface } from '../../../Domain/Validator/item.validator.interface';
export class JoiValidatorSchema implements SchemaValidatorInterface {
  errors(): any {}

  validate(items: ItemValidatorInterface[]): boolean {
    return false;
  }
}
