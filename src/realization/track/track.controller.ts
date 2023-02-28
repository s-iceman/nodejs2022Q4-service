import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Post,
  Delete,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './track.dto';
import { AtGuard } from '../guards/auth.guard';

@Controller('track')
@UseGuards(AtGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  async getTrack(@Param('id') id: string) {
    return await this.trackService.getTrack(id);
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    await this.trackService.deleteTrack(id);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() updateTrackDto: TrackDto) {
    return await this.trackService.updateTrack(id, updateTrackDto);
  }
}
