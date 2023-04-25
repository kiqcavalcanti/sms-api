import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ListBlacklistDtoInterface } from '../../../Core/Application/Dto/Blacklist/list-blacklist.dto.interface';

export class ListBlacklistGroupDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number | null = 1;

  @IsOptional()
  @IsString()
  search: string = null;

  toPlainObject(camel = true): Omit<ListBlacklistDtoInterface, 'ownerUserId'> {
    return {
      page: this.page,
      search: this.search,
    };
  }
}
