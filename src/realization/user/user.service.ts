import { Injectable } from '@nestjs/common';
import { Database } from '../../database/db.provider';
import { IUser } from '../../database/interfaces/user.interface';
import * as uuid from 'uuid';
import { InvalidUuid, NotFound } from 'src/common/exceptions';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  async getUsers(): Promise<IUser[]> {
    return await this.db.users.getUsers();
  }

  async getUser(id: string): Promise<IUser> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    const user = await this.db.users.getUser(id);
    if (!user) {
      throw new NotFound();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.db.users.createUser(createUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    await this.db.deleteUser(id);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    return await this.db.users.updatePassword(id, updatePasswordDto);
  }
}
