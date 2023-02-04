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
import { NotFound, InvalidUuid } from './../../common/exceptions';
// import { CreateArtistDto } from './artist.dto';
import { AlbumService } from './album.service';
import { getNotFoundMsg } from '../../common/uuid-helper';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    try {
      return await this.albumService.getAlbum(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('Album', id),
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

  @Post()
  async createAlbum(@Body() createTrackDto: any) {
    console.log(createTrackDto);
    // return await this.trackService.createTrack(createArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    try {
      await this.albumService.deleteAlbum(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('Album', id),
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
