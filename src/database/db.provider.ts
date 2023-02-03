import { Injectable } from '@nestjs/common';
import { IUserDatabase } from './interfaces/db.interface';
import { IUser } from './interfaces/user.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/realization/user/user.dto';
import { UserDatabaseComponent } from './components/user.db';

@Injectable()
export class Database implements IUserDatabase {
  private users: IUserDatabase;

  constructor() {
    this.users = new UserDatabaseComponent();
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
}
