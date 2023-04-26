import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GenderEnum } from '../../../Core/Domain/Enums/gender.enum';
import { SocialClassEnum } from '../../../Core/Domain/Enums/social-class.enum';
import { Type } from 'class-transformer';
import { AgeRangeDto } from './age-range.dto';
import { IncomeRangeDto } from './income-range.dto';
import { RegionDto } from './region.dto';

export class TargetFiltersDto {
  @IsEnum(GenderEnum, { each: true, message: 'Gender must be a valid value' })
  @IsArray()
  @ArrayUnique()
  genders: [GenderEnum] | [GenderEnum, GenderEnum];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => AgeRangeDto)
  age_range: AgeRangeDto[];

  @IsEnum(SocialClassEnum, {
    each: true,
    message: 'Social class must be a valid value',
  })
  social_classes: SocialClassEnum[];

  @IsOptional()
  @Type(() => RegionDto)
  regions?: RegionDto[];

  @IsString()
  education_level: string;

  @IsString()
  occupation: string;

  @IsString()
  job_title: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => IncomeRangeDto)
  income_range: IncomeRangeDto[];
}
