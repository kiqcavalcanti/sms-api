import { CreateProjectDtoInterface } from '../../../Core/Application/Dto/Project/create-project.dto.interface';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SendTypeEnum } from '../../../Core/Domain/Enums/send-type.enum';
import { TargetFiltersDto } from './target-filters.dto';
import { ScheduleDto } from './schedule.dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  owner_user_id: string;

  @IsString()
  message: string;

  @IsEnum(SendTypeEnum, { message: 'Send type must be a valid value' })
  @IsOptional()
  send_type: SendTypeEnum = SendTypeEnum.SMS;

  @IsString()
  title: string;

  @Type(() => TargetFiltersDto)
  target_filters: TargetFiltersDto;

  @Type(() => ScheduleDto)
  schedule: ScheduleDto;

  toPlainObject(): CreateProjectDtoInterface {
    return {
      ownerUserId: this.owner_user_id,
      message: this.message,
      title: this.title,
      sendType: this.send_type,
      name: this.name,
      schedule: {
        config: {
          startHour: this.schedule.config.start_hour,
          endHour: this.schedule.config.end_hour,
          allowedDays: this.schedule.config.allowed_days,
        },
        batch: this.schedule.batch.map((i) => ({
          endDate: i.end_date,
          startDate: i.start_date,
          auto: i.auto,
          lastBatchDate: i.last_batch_date,
          lastBatchStartHour: i.last_batch_start_hour,
          percentage: i.percentage,
          quantity: i.quantity,
        })),
      },
      targetFilters: {
        genders: this.target_filters.genders,
        ageRange: [
          this.target_filters.age_range[0].first,
          this.target_filters.age_range[0].second,
        ],
        educationLevel: this.target_filters.education_level,
        incomeRange: [
          this.target_filters.income_range[0].first,
          this.target_filters.income_range[0].second,
        ],
        jobTitle: this.target_filters.job_title,
        occupation: this.target_filters.occupation,
        regions: this.target_filters.regions,
        socialClasses: this.target_filters.social_classes,
      },
    };
  }
}
