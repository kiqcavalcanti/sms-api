import {
  Schedule,
  TargetFilters,
} from '../../../Domain/Entities/project-entity.types';
import { SendTypeEnum } from '../../../Domain/Enums/send-type.enum';

export interface CreateProjectDtoInterface {
  ownerUserId: string;
  sendType: SendTypeEnum;
  targetFilters: TargetFilters;
  name: string;
  title: string;
  message: string;
  schedule: Schedule;
}
