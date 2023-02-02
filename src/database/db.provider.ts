import { Injectable } from '@nestjs/common';
import { IDatabase } from './db.interface';
import { IUser } from 'src/models/user/user.interface';

@Injectable()
export class Database implements IDatabase {
  private users: [];

  constructor() {
    this.users = [];
  }

  async getUsers(): Promise<IUser[]> {
    return new Promise((resolve) => resolve(this.users));
  }

  async getUser(id: string): Promise<IUser> {
    const user = this.users.find((u: IUser) => u.id === id);
    return new Promise((resolve) => resolve(user));
  }

  async createUsers(login: string, password: string): Promise<IUser | void> {
    console.log(login, password);
  }
}
