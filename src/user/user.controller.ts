import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Session,
} from '@nestjs/common';
import session from 'express-session';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getLogin() {
    return this.userService.getLogin();
  }

  @Post('/signup')
  async postSignup(@Body() body: SignupDto) {
    return { message: await this.userService.postSignup(body) };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async postLogin(
    @Body() body: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userService.postLogin(body);
    session.user = user;
    session.connected = true;
  }
}
