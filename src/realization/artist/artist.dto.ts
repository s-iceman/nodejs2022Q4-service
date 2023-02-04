import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsBoolean()
  @IsNotEmpty()
  public grammy: boolean;
}

export { CreateArtistDto };
