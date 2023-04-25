import {
  IsString,
  IsOptional,
  IsInt,
  IsJSON,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { classToPlainObject } from '../../../Core/Infra/Helpers/custom.helpers';
import { Type } from 'class-transformer';
import { Filter } from '../../../Core/Domain/Repositories/Main/paginate.filter.interface';
import { OperatorEnum } from '../../../Core/Domain/Enums/operator.enum';

class FilterValueDto {
  @IsJSON()
  @IsOptional()
  name?: string;

  @IsJSON()
  @IsOptional()
  type?: string;

  @IsJSON()
  @IsOptional()
  identifier?: string;
}

export class ListUserDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterValueDto)
  filter: FilterValueDto;

  @IsOptional()
  @IsString({ each: true })
  include: string[] = [];

  @IsOptional()
  @IsString()
  sort = '-createdAt';

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page: number | null = 1;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  per_page: number | null = 15;

  toPlainObject(camel = true) {
    const dto = classToPlainObject(this, camel);

    const filters: Filter[] = Object.entries(dto.filter ?? {}).map(
      ([fieldName, fieldValue]) => {
        const jsonValue = JSON.parse(fieldValue as string);

        const operator = Object.keys(jsonValue)[0] as OperatorEnum;

        if (!Object.values(OperatorEnum).includes(operator)) {
          throw new Error('invalid operator');
        }

        const value = jsonValue[operator];

        return {
          fieldName: fieldName,
          operator: operator as OperatorEnum,
          value: value,
        };
      },
    );

    return {
      ...dto,
      filters,
    };
  }
}
