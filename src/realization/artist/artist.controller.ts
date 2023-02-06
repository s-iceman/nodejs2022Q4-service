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
    return await this.artistService.getArtist(id);
  }

  @Post()
  async createArtist(@Body() createArtistDto: ArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    await this.artistService.deleteArtist(id);
  }

  @Put(':id')
  async updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }
}
