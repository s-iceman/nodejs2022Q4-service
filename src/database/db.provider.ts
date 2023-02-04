import { Injectable } from '@nestjs/common';
import { IArtistDatabase, IUserDatabase } from './interfaces/db.interface';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdatePasswordDto } from '../realization/user/user.dto';
import { CreateArtistDto } from '../realization/artist/artist.dto';
import { UserDatabaseComponent } from './components/user.db';
import { ArtistDatabaseComponent } from './components/artist.db';
import { IArtist } from './interfaces/artist.interface';

@Injectable()
export class Database implements IUserDatabase, IArtistDatabase {
  private users: IUserDatabase;
  private artists: IArtistDatabase;

  constructor() {
    this.users = new UserDatabaseComponent();
    this.artists = new ArtistDatabaseComponent();
  }

  async getUsers(): Promise<IUser[]> {
    return await this.users.getUsers();
  }

  async getUser(id: string): Promise<IUser | null> {
    return await this.users.getUser(id);
  }

  async createUsers(createUserDto: CreateUserDto): Promise<IUser> {
    return await this.users.createUsers(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.users.deleteUser(id);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    return await this.users.updatePassword(id, updatePasswordDto);
  }

  async getArtists(): Promise<IArtist[]> {
    return await this.artists.getArtists();
  }

  async getArtist(id: string): Promise<IArtist> {
    return await this.artists.getArtist(id);
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<IArtist> {
    return this.artists.createArtist(createArtistDto);
  }

  async deleteArtist(id: string): Promise<void> {
    await this.artists.deleteArtist(id);
  }
}
