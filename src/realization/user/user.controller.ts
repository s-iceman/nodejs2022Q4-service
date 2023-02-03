import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { InvalidUuid, UserNotFound } from 'src/common/exceptions';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
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

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
