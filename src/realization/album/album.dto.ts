import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class AlbumDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  public year: number;

  @IsOptional()
  public artistId: string | null;
}
