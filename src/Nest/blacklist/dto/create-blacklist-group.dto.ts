import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { classToPlainObject } from '../../../Core/Infra/Helpers/custom.helpers';
import { CreateBlacklistGroupDtoInterface } from '../../../Core/Application/Dto/Blacklist/create-blacklist-group.dto.interface';

export class CreateBlacklistGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  toPlainObject(
    camel = true,
  ): Omit<CreateBlacklistGroupDtoInterface, 'ownerUserId'> {
    return classToPlainObject(this, camel);
  }
}
