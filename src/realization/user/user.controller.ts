import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvalidUuid, UserNotFound } from 'src/common/exceptions';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    const res = this.userService.getUsers();
    return res;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.userService.getUser(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof UserNotFound) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
