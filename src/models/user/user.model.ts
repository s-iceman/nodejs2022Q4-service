import { IUser } from './user.interface';
import { v4 } from 'uuid';

export class User implements IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = 0;
    this.id = v4();
  }

  getUser(): IUser {
    return {
      id: this.id,
      login: this.login,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version,
    };
  }
}
