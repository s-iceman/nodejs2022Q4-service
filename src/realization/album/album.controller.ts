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
} from '@nestjs/common';
import { AlbumDto } from './album.dto';
import { AlbumService } from './album.service';

@Controller('album')
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
    console.log(JSON.stringify(updateAlbumDto), id);
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }
}
