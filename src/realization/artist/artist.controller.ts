import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  HttpException,
  Post,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { NotFound, InvalidUuid, InvalidBoolType, WrongPassword } from './../../common/exceptions';
import { getNotFoundMsg } from '../../common/helper';
import { ArtistDto } from './artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtist(@Param('id') id: string) {
    try {
      return await this.artistService.getArtist(id);
    } catch (err) {
      this.processExceptions(err, id);
    }
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    try {
      await this.artistService.deleteArtist(id);
    } catch (err) {
      this.processExceptions(err, id);
    }
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    try {
      return this.artistService.updateArtist(id, updateArtistDto);
    } catch (err) {
      this.processExceptions(err, id);
    }
  }

  private processExceptions(err: Error, id: string): void {
    if (err instanceof InvalidUuid) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } else if (err instanceof NotFound) {
      throw new HttpException(
        getNotFoundMsg('Artist', id),
        HttpStatus.NOT_FOUND,
      );
    } else {
      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
