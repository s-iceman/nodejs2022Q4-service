import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../../database/db.provider';
import { IUser } from '../../database/interfaces/user.interface';
import * as uuid from 'uuid';
import { InvalidUuid, UserNotFound, WrongPassword } from 'src/common/exceptions';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';

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

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.db.user.create({ data: createUserDto });
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
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        select: { password: true, version: true },
      });
      if (!user) {
        throw new UserNotFound();
      }

      if (user.password !== updatePasswordDto.oldPassword) {
        throw new WrongPassword();
      }

      const updatedUser = await this.db.user.update({
        where: { id },
        data: {
          password: updatePasswordDto.newPassword,
          version: ++user.version,
        },
      });
      return { ...new User(updatedUser) };
    } catch (err) {
      throw err;
    }
  }
}
