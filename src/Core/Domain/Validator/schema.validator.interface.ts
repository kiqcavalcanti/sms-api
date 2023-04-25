import { ItemValidatorInterface } from './item.validator.interface';

export interface SchemaValidatorInterface {
  errors(): any;
  validate(items: ItemValidatorInterface[]): boolean;
}
