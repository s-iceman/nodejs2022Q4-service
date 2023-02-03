import { IUser } from '../models/user/user.interface';
import { CreateUserDto } from 'src/realization/user/user.dto';

export interface IDatabase {
  getUsers(): Promise<IUser[]>;
  getUser(id: string): Promise<IUser>;
  createUsers(createUserDto: CreateUserDto): Promise<IUser | void>;
}
