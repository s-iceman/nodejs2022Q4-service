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
import { AlbumDto } from './album.dto';
import { AlbumService } from './album.service';
import { AtGuard } from '../auth/auth.guard';

@Controller('album')
@UseGuards(AtGuard)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    return await this.albumService.getAlbum(id);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    await this.albumService.deleteAlbum(id);
  }

  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: AlbumDto) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }
}
