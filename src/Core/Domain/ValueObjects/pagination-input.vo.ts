import { SortFieldVo } from './sort-field.vo';
import { SortEnum } from '../Enums/sort.enum';
import { BaseValueObject } from './base.value-object';
import { BaseEntity } from '../Entities/base.entity';
import { Filter } from '../Repositories/Main/paginate.filter.interface';
import { FilterableField } from './filterable-field.vo';
import { InvalidArgumentException } from '../Exceptions/invalid-argument.exception';
import { OperatorEnum } from '../Enums/operator.enum';
import { VariableTypeEnum } from '../Enums/variable-type.enum';
import { isNotEmpty } from '../../Infra/Helpers/custom.helpers';

type Value<Entity> = {
  filters: Filter[];
  includes: string[];
  sort: Extract<keyof Entity, string>;
  page: number;
  perPage: number;
};

export class PaginationInputVo<
  Entity extends BaseEntity,
> extends BaseValueObject<Value<Entity>> {
  get sort(): SortFieldVo | null {
    if (!this.value.sort) {
      return null;
    }

    return this.value.sort.startsWith('-')
      ? new SortFieldVo({
          field: this.value.sort.replace('-', ''),
          direction: SortEnum.DESC,
        })
      : new SortFieldVo({ field: this.value.sort, direction: SortEnum.ASC });
  }

  get page(): number {
    return this.value.page <= 0 ? 1 : this.value.page;
  }

  get perPage(): number {
    return this.value.perPage <= 0 ? 15 : this.value.perPage;
  }

  getFilters(filterableFields: any[]) {
    this.validateFilters(filterableFields);

    return this.value.filters;
  }

  get includes() {
    return this.value.includes;
  }

  protected validateFilters(filterableFields: FilterableField[]) {
    for (const filter of this.value.filters) {
      const currentFilter = filterableFields.find(
        (filterable) => filterable.name === filter.fieldName,
      );

      if (!currentFilter) {
        const availableFields = filterableFields
          .map((filterable) => filterable.name)
          .join(', ');

        throw new InvalidArgumentException(
          `filter: ${filter.fieldName} is not available. The available fields are: ${availableFields}`,
        );
      }

      this.validateOperator(filter, currentFilter);

      this.validateDataType(filter, currentFilter);
    }
  }

  protected validateOperator(filter: Filter, filterableField: FilterableField) {
    const valid = Object.values(OperatorEnum).includes(filter.operator);

    if (!valid) {
      throw new InvalidArgumentException(
        `filter: operator is invalid for type ${filter.operator}`,
      );
    }

    let enumsBase: string[] = [
      OperatorEnum.EQ,
      OperatorEnum.NEQ,
      OperatorEnum.GT,
      OperatorEnum.GTE,
      OperatorEnum.LT,
      OperatorEnum.LTE,
      OperatorEnum.IN,
      OperatorEnum.NULL,
      OperatorEnum.NOT_NULL,
    ];

    if (filterableField.type === VariableTypeEnum.DATE) {
      enumsBase = [...enumsBase, OperatorEnum.BETWEEN];
    }

    if (filterableField.type === VariableTypeEnum.STRING) {
      enumsBase = [...enumsBase, OperatorEnum.LIKE];
    }

    if (!enumsBase.includes(filter.operator)) {
      throw new InvalidArgumentException(
        `filter: operator is invalid for type ${filter.operator}`,
      );
    }
  }

  protected validateDataType(filter: Filter, filterableField: FilterableField) {
    const isOperatorInOrBetween = [
      OperatorEnum.BETWEEN,
      OperatorEnum.IN,
    ].includes(filter.operator);

    if (isOperatorInOrBetween) {
      this.validateArrayDataType(filter, filterableField);
      return;
    }

    if ([OperatorEnum.NULL, OperatorEnum.NOT_NULL].includes(filter.operator)) {
      if (isNotEmpty(filter.value)) {
        throw new InvalidArgumentException('filter: data type is invalid');
      }
      return;
    }

    if (filterableField.type === VariableTypeEnum.DATE) {
      this.validateDate(filter.value as string);

      return;
    }

    if (filterableField.type !== typeof filter.value) {
      throw new InvalidArgumentException('filter: data type is invalid');
    }
  }

  protected validateArrayDataType(
    filter: Filter,
    filterableField: FilterableField,
  ) {
    if (!Array.isArray(filter.value)) {
      throw new InvalidArgumentException('filter: value must be an array');
    }

    if (filter.operator === OperatorEnum.BETWEEN && filter.value.length !== 2) {
      throw new InvalidArgumentException(
        'filter: value must be an array with 2 values',
      );
    }

    for (const value of filter.value) {
      if (filterableField.type === VariableTypeEnum.DATE) {
        this.validateDate(value);
        continue;
      }

      if (filterableField.type !== (typeof value).toUpperCase()) {
        throw new InvalidArgumentException('filter: data type is invalid');
      }
    }
  }

  protected validateDate(value: string | number) {
    if (typeof value !== 'string' || isNaN(Date.parse(value))) {
      throw new InvalidArgumentException(
        'filter: date value must be a valid string',
      );
    }
  }
}
