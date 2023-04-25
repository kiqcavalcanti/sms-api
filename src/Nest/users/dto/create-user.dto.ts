import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { classToPlainObject } from '../../../Core/Infra/Helpers/custom.helpers';
import { CreateUserDtoInterface } from '../../../Core/Application/Dto/User/create-user.dto.interface';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Matches(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/, {
    message: 'name is probably invalid',
  })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  toPlainObject(camel = true): CreateUserDtoInterface {
    return classToPlainObject(this, camel);
  }
}
