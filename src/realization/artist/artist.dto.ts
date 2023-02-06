import { IsNotEmpty, IsString } from 'class-validator';
import { ToBoolean } from '../../common/helper';

export class ArtistDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @ToBoolean()
  public grammy: boolean;
}
