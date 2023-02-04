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
} from '@nestjs/common';
import { ArtistNotFound, InvalidUuid } from './../../common/exceptions';
import { CreateArtistDto } from './artist.dto';
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
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof ArtistNotFound) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    try {
      await this.artistService.deleteArtist(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof ArtistNotFound) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
    }
  }
}
