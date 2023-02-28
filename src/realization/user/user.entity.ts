import { IUser } from 'src/database/interfaces/user.interface';

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(data) {
    this.id = data.id;
    this.login = data.login;
    this.version = data.version;
    this.createdAt = data.createdAt.getTime();
    this.updatedAt = data.updatedAt.getTime();
  }
}
