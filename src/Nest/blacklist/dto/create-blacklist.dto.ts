import { IsPhoneNumber, IsUUID } from 'class-validator';
import { classToPlainObject } from '../../../Core/Infra/Helpers/custom.helpers';
import { CreateBlacklistDtoInterface } from '../../../Core/Application/Dto/Blacklist/create-blacklist.dto.interface';

export class CreateBlacklistDto {
  @IsPhoneNumber('BR')
  phone_number: string;

  @IsUUID('4', { each: true })
  group_ids: string[];

  toPlainObject(camel = true): CreateBlacklistDtoInterface {
    return classToPlainObject(this, camel);
  }
}
