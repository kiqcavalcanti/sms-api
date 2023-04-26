import { Type } from 'class-transformer';
import { IsInt, Max, Min, Validate } from 'class-validator';

export class IncomeRangeDto {
  @Type(() => Number)
  @IsInt()
  @Min(500)
  @Max(10000)
  first: number;

  @Type(() => Number)
  @IsInt()
  @Min(500)
  @Max(10000)
  second: number;

  @Validate((range: IncomeRangeDto) => range.first <= range.second, {
    message: 'Start must be less than or equal to end',
  })
  validate() {}
}
