import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DaysEnum } from '../../../Core/Domain/Enums/days.enum';

class ScheduleBatchDto {
  @IsBoolean()
  auto: boolean;

  @Type(() => Date)
  @IsOptional()
  start_date?: Date;

  @Type(() => Date)
  @IsOptional()
  end_date?: Date;

  @IsNumber()
  @IsOptional()
  percentage?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Type(() => Date)
  @IsOptional()
  last_batch_date?: Date;

  @IsString()
  @IsOptional()
  last_batch_start_hour?: string;
}

class ScheduleConfigDto {
  @IsString()
  start_hour: string;

  @IsString()
  end_hour: string;

  @IsEnum(DaysEnum, { each: true })
  @ArrayUnique()
  allowed_days: DaysEnum[];
}

export class ScheduleDto {
  @Type(() => ScheduleConfigDto)
  config: ScheduleConfigDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleBatchDto)
  batch: ScheduleBatchDto[];
}
