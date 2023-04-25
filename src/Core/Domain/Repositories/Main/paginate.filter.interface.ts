import { OperatorEnum } from '../../Enums/operator.enum';

export interface Filter {
  fieldName: string;
  operator: OperatorEnum;
  value: number | number[] | string | string[];
}
