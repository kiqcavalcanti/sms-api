import { SnakeCaseKeys } from '../Types/types';
import { DaysEnum } from '../Enums/days.enum';
import { GenderEnum } from '../Enums/gender.enum';
import { SocialClassEnum } from '../Enums/social-class.enum';
import { SendTypeEnum } from '../Enums/send-type.enum';

export type ProjectAsJson = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  name: string;
};

export type Region = {
  state: string;
  city: string;
  neighborhood: string;
  zipcode: string;
};

export type TargetFilters = {
  genders: [GenderEnum] | [GenderEnum, GenderEnum];
  ageRange: [number, number];
  socialClasses: SocialClassEnum[];
  educationLevel: string;
  occupation: string;
  jobTitle: string;
  incomeRange: [number, number];
  regions: Region[];
};

export type ScheduleConfig = {
  startHour: string;
  endHour: string;
  allowedDays: DaysEnum[];
};

export type ScheduleBatch = {
  auto: boolean;
  startDate?: Date;
  endDate?: Date;
  percentage?: number;
  quantity?: number;
  lastBatchDate?: Date;
  lastBatchStartHour?: string;
};

export type Schedule = {
  config: ScheduleConfig;
  batch: ScheduleBatch[];
};

export type ProjectProperties = {
  id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  active?: boolean;
  ownerUserId: string;
  sendType: SendTypeEnum;
  targetFilters: TargetFilters;
  name: string;
  title: string;
  message: string;
  schedule: Schedule;
};

export type UpdateData = {
  name?: string;
};

export type ProjectAsSnakeCaseJson = SnakeCaseKeys<ProjectAsJson>;
