import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('read_users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('create_user')
  async createUser(): Promise<User> {
    try {
      return this.userService.create();
    } catch (ex) {
      return ex.message
    }
  }

  @Get('update_user')
  async updateUser(): Promise<any> {
    return this.userService.updateById();
  }

  @Get('delete_user')
  async deleteUser(): Promise<User> {
    return this.userService.deleteById();
  }
}
