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
import { NotFound, InvalidUuid } from './../../common/exceptions';
import { TrackService } from './track.service';
import { getNotFoundMsg } from '../../common/helper';
import { TrackDto } from './track.dto';

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
      this.processException(err, id);
    }
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    try {
      await this.trackService.deleteTrack(id);
    } catch (err) {
      this.processException(err, id);
    }
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updateTrackDto: TrackDto) {
    try {
      return await this.trackService.updateTrack(id, updateTrackDto);
    } catch (err) {
      this.processException(err, id);
    }
  }

  private processException(err: Error, id: string): void {
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
