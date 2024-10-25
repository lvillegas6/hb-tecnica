import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '../service/users.service';
import { CreateUsertDto } from '../dto/user.dto';

@Controller('users')
export class UserController {

  constructor (readonly userService: UserService){}

  @Get()
  login() {
    return 'This action returns all users';
  }

  @Get("/all")
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto: CreateUsertDto) {
    return this.userService.create(createUserDto);
  }
}
