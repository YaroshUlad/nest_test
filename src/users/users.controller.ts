import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserModelWithoutPassword } from 'src/users/user.model';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(): Promise<UserModelWithoutPassword[]> {
    return this.usersService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(@Param() params): Promise<UserModelWithoutPassword> {
    const { id } = params;
    return this.usersService.find('_id', id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  updateUser(
    @Param() params,
    @Body() payload: UpdateUserDto,
  ): Promise<UserModelWithoutPassword> {
    const { id } = params;
    return this.usersService.update(id, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUser(@Param() params): Promise<[]> {
    const id = params.id;
    return this.usersService.delete(id);
  }
}
