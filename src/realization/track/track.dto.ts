import { Optional } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number.parseInt(value))
  public duration: number;

  @Optional()
  public artistId: string;

  @Optional()
  public albumId: string;
}
