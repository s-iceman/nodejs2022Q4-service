import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../../database/db.provider';
import { IUser } from '../../database/interfaces/user.interface';
import * as uuid from 'uuid';
import {
  AuthFailed,
  InvalidUuid,
  UserNotFound,
  WrongPassword,
} from 'src/common/exceptions';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { isPasswordsEqual, hashPassword } from 'src/common/password-helper';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUsers(): Promise<IUser[]> {
    const users = await this.db.user.findMany();
    return users.map((e) => ({ ...new User(e) }));
  }

  async getUser(id: string): Promise<IUser> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    try {
      const user = await this.db.user.findUnique({ where: { id } });
      return { ...new User(user) };
    } catch (err) {
      throw new UserNotFound();
    }
  }

  async validateUser(createUserDto: CreateUserDto): Promise<any> {
    const { login, password } = createUserDto;
    const user = await this.db.user.findFirst({ where: { login } });
    if (!user) {
      throw new AuthFailed();
    }

    const isValid = await isPasswordsEqual(password, user.password);
    if (!isValid) {
      throw new AuthFailed();
    }

    return { ...new User(user) };
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const password = await hashPassword(createUserDto.password);
      console.log(password);
      const user = await this.db.user.create({
        data: { login: createUserDto.login, password: password },
      });
      return { ...new User(user) };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }
    try {
      await this.db.user.delete({ where: { id } });
    } catch (err) {
      throw new UserNotFound();
    }
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUser> {
    if (!uuid.validate(id)) {
      throw new InvalidUuid();
    }

    const user = await this.db.user.findUnique({
      where: { id },
      select: { password: true, version: true },
    });
    if (!user) {
      throw new UserNotFound();
    }

    const isEqual = await isPasswordsEqual(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!isEqual) {
      throw new WrongPassword();
    }

    const updatedUser = await this.db.user.update({
      where: { id },
      data: {
        password: await hashPassword(updatePasswordDto.newPassword),
        version: ++user.version,
      },
    });
    return { ...new User(updatedUser) };
  }
}
