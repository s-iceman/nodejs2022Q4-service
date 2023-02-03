import { Injectable } from '@nestjs/common';
import { Database } from '../../database/db.provider';
import { IUser } from 'src/models/user/user.interface';
import * as uuid from 'uuid';
import { InvalidUuid, UserNotFound } from 'src/common/exceptions';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  async getUsers(): Promise<IUser[]> {
    return await this.db.getUsers();
  }

  async getUser(id: string): Promise<IUser> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    const user = await this.db.getUser(id);
    if (!user) {
      throw new UserNotFound(id);
    }
    return user;
  }
}
