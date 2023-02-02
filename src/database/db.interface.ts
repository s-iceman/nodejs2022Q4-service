import { IUser } from '../models/user/user.interface';

export interface IDatabase {
  getUsers(): Promise<IUser[]>;
  getUser(id: string): Promise<IUser>;
  createUsers(login: string, password: string): Promise<IUser | void>;
}
