import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    return await this.favoritesService.getFavorites();
  }

  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async addAlbum(@Param('id') id: string) {
    this.favoritesService.addAlbum(id);
  }

  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async addTrack(@Param('id') id: string) {
    this.favoritesService.addTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async addArtist(@Param('id') id: string) {
    this.favoritesService.addArtist(id);
  }
}
