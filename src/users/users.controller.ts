import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/user.model';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<UserModel[]> {
    return this.usersService.getAll();
  }

  @Patch(':id')
  getOne(@Param() params): Promise<UserModel> {
    const id = +params.id;
    return this.usersService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  updateUser(
    @Param() params,
    @Body() payload: UpdateUserDto,
  ): Promise<UserModel> {
    const id = +params.id;
    return this.usersService.update(id, payload);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteUser(@Param() params): Promise<[]> {
    const id = +params.id;
    return this.usersService.delete(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  createUser(@Body() payload: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(payload.username, payload.password);
  }
}
