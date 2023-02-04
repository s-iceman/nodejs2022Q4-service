import { IUserDatabase } from './../interfaces/db.interface';
import { IUser, UserPartial } from '../interfaces/user.interface';
import {
  CreateUserDto,
  UpdatePasswordDto,
} from 'src/realization/user/user.dto';
import { generateUuid } from '../../common/helper';
import { NotFound, WrongPassword } from 'src/common/exceptions';

export class UserDatabaseComponent implements IUserDatabase {
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

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const id = generateUuid(this.users);
    const timestamp = Date.now();
    const user = {
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await this.users.set(id, user);
    return { id, ...this.filterPassword(user) };
  }

  async deleteUser(id: string): Promise<void> {
    if (this.users.has(id)) {
      await this.users.delete(id);
    } else {
      throw new NotFound();
    }
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    const userData = this.users.get(id);
    if (!userData) {
      throw new NotFound();
    }

    if (userData.password !== updatePasswordDto.oldPassword) {
      throw new WrongPassword();
    }

    const updated = {
      login: userData.login,
      password: updatePasswordDto.newPassword,
      createdAt: userData.createdAt,
      version: ++userData.version,
      updatedAt: Date.now(),
    };
    this.users.set(id, updated);
    return new Promise((resolve) =>
      resolve({ id, ...this.filterPassword(updated) }),
    );
  }

  private filterPassword({ login, createdAt, updatedAt, version }) {
    return { login, createdAt, updatedAt, version };
  }
}
