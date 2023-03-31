import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Request,
} from '@nestjs/common';
import { AddDeleteFriendDto } from 'src/friends/dto/addDeleteFriend.dto';
import { FriendsService } from 'src/friends/friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch()
  addFriend(
    @Body() payload: AddDeleteFriendDto,
    @Request() req,
  ): Promise<void> {
    const ownerId = req.user.sub;
    const { friendId } = payload;
    return this.friendsService.addFriend(ownerId, friendId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteFriend(
    @Body() payload: AddDeleteFriendDto,
    @Request() req,
  ): Promise<void> {
    const ownerId = req.user.sub;
    const { friendId } = payload;
    return this.friendsService.deleteFriend(ownerId, friendId);
  }
}
