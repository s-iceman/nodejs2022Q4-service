import { Injectable } from '@nestjs/common';
import { Database } from '../../database/db.provider';
import { IUser } from 'src/models/user/user.interface';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  async getUsers(): Promise<IUser[]> {
    return await this.db.getUsers();
  }

  async getUser(id: string): Promise<IUser> {
    return await this.db.getUser(id);
  }
}
