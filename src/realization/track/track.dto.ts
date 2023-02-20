import { Transform } from 'class-transformer';
import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  public duration: number;

  @IsOptional()
  public artistId: string | null;

  @IsOptional()
  public albumId: string | null;
}
