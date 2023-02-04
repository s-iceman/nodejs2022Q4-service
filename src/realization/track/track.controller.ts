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
import { TrackService } from './track.service';
import { getNotFoundMsg } from '../../common/uuid-helper';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') id: string) {
    try {
      return await this.trackService.getTrack(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('Track', id),
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
  async createArtist(@Body() createTrackDto: any) {
    console.log(createTrackDto);
    // return await this.trackService.createTrack(createArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    try {
      await this.trackService.deleteTrack(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('Track', id),
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
