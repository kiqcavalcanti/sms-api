import { IsString, IsOptional } from 'class-validator';
import { classToPlainObject } from '../../../Core/Infra/Helpers/custom.helpers';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  identifier: string;

  toPlainObject(camel = true) {
    return classToPlainObject(this, camel);
  }
}
