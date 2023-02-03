import { IUser } from '../interfaces/user.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/realization/user/user.dto';

export interface IUserDatabase {
  getUsers(): Promise<IUser[]>;
  getUser(id: string): Promise<IUser>;
  createUsers(createUserDto: CreateUserDto): Promise<IUser>;
  deleteUser(id: string): Promise<void>;
  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser>;
}
