import { IsString, Max, Min } from 'class-validator';

export class RegionDto {
  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  neighborhood: string;

  @IsString()
  @Min(8)
  @Max(8)
  zipcode: string;
}
