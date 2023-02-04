import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { InvalidUuid, NotFound } from '../../common/exceptions';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { UserService } from './user.service';
import { getNotFoundMsg } from '../../common/uuid-helper';

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
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('User', id),
          HttpStatus.NOT_FOUND,
        );
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('User', id),
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  @Put(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    try {
      console.log(id, updatePassword.newPassword, updatePassword.oldPassword);
      return await this.userService.updatePassword(id, updatePassword);
    } catch (err) {
      if (err instanceof InvalidUuid) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      } else if (err instanceof NotFound) {
        throw new HttpException(
          getNotFoundMsg('User', id),
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
