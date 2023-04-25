import { ItemValidatorInterface } from '../../../Domain/Validator/item.validator.interface';
import Joi from 'joi';
export class JoiValidatorItem implements ItemValidatorInterface {
  protected rule: Joi.Schema[] = [];
  protected type: 'string' | 'number' = null;
  constructor(protected readonly fieldName: string) {}

  boolean(customMessage?: string): ItemValidatorInterface {
    this.addRule(Joi.boolean(), customMessage);
    return this;
  }

  date(customMessage?: string): ItemValidatorInterface {
    this.addRule(Joi.date(), customMessage);
    return this;
  }

  getFieldName(): string {
    return this.fieldName;
  }

  max(max: number, customMessage?: string): ItemValidatorInterface {
    if (this.type === 'string') {
      this.addRule(Joi.string().max(max), customMessage);
    }

    if (this.type === 'number') {
      this.addRule(Joi.number().max(max), customMessage);
    }

    if (!this.type) {
      throw new Error(
        'you should use the function number or string before this',
      );
    }

    return this;
  }

  min(min: number, customMessage?: string): ItemValidatorInterface {
    if (this.type === 'string') {
      this.addRule(Joi.string().min(min), customMessage);
    }

    if (this.type === 'number') {
      this.addRule(Joi.number().min(min), customMessage);
    }

    if (!this.type) {
      throw new Error(
        'you should use the function number or string before this',
      );
    }

    return this;
  }

  required(customMessage?: string): ItemValidatorInterface {
    this.addRule(Joi.required(), customMessage);

    return this;
  }

  string(customMessage?: string): ItemValidatorInterface {
    this.addRule(Joi.string(), customMessage);
    this.type = 'string';

    return this;
  }

  addRule(rule: Joi.Schema, customMessage?: string) {
    if (customMessage) {
      rule.message(customMessage);
    }

    this.rule.push(rule);
  }
}
