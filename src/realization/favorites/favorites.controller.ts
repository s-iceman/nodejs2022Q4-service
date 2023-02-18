import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    const res = await this.favoritesService.getFavorites();
    console.log(res);
    return res;
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbum(@Param('id') id: string) {
    await this.favoritesService.addAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrack(@Param('id') id: string) {
    await this.favoritesService.addTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtist(@Param('id') id: string) {
    await this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    await this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string) {
    await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    await this.favoritesService.deleteArtist(id);
  }
}
