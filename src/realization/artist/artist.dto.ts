import { IsNotEmpty, IsString } from 'class-validator';
import { ToBoolean } from '../../common/uuid-helper';

class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @ToBoolean()
  public grammy: boolean;
}

export { CreateArtistDto };
