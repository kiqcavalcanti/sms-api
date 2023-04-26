import { Type } from 'class-transformer';
import { IsInt, Max, Min, Validate } from 'class-validator';

export class AgeRangeDto {
  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  first: number;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  @Max(100)
  second: number;

  @Validate((range: AgeRangeDto) => range.first <= range.second, {
    message: 'Start must be less than or equal to end',
  })
  validate() {}
}
