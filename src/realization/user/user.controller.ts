import { Controller, Get, Param } from '@nestjs/common';
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
  getById(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
