import { Injectable } from '@nestjs/common';
import { IDatabase } from './db.interface';
import { IUser, UserPartial } from 'src/models/user/user.interface';
import { CreateUserDto } from 'src/realization/user/user.dto';
import { generateUuid } from '../common/uuid-helper';

@Injectable()
export class Database implements IDatabase {
  private users: Map<string, UserPartial>;

  constructor() {
    this.users = new Map();
  }

  async getUsers(): Promise<IUser[]> {
    const res: IUser[] = [];
    for (const [key, value] of this.users.entries()) {
      res.push({ id: key, ...value });
    }
    return new Promise((resolve) => resolve(res));
  }

  async getUser(id: string): Promise<IUser | null> {
    const user = this.users.get(id);
    return new Promise((resolve) =>
      resolve(user ? { id, ...this.filterPassword(user) } : null),
    );
  }

  async createUsers(createUserDto: CreateUserDto): Promise<IUser> {
    const id = generateUuid(this.users);
    const user = {
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0,
    };
    this.users.set(id, user);
    return { id, ...this.filterPassword(user) };
  }

  private filterPassword({ login, createdAt, updatedAt, version }) {
    return { login, createdAt, updatedAt, version };
  }
}
