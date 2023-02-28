import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './payload.type';

@Injectable()
export class AuthService {
  expiredTime: string;
  secret: string;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
    this.expiredTime = process.env.TOKEN_EXPIRE_TIME || '1h';
    this.secret = process.env.JWT_SECRET_KEY;
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.validateUser(createUserDto);

    const { login, id } = user;
    const token = await this.getToken(id, login);
    return token;
  }

  async getToken(userId: string, login: string): Promise<any> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      login: login,
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.secret,
      expiresIn: this.expiredTime,
    });

    return { accessToken: token };
  }
}
