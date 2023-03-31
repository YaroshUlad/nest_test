import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

import { DeedsService } from 'src/deeds/deeds.service';
import { DeedModel } from 'src/deeds/deed.model';
import { CreateDeedDto } from './dto/createDeed.dto';

@Controller('deeds')
export class DeedsController {
  constructor(private deedsService: DeedsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createDeed(
    @Body() payload: CreateDeedDto,
    @Request() req,
  ): Promise<DeedModel> {
    const ownerId = req.user.sub;
    return this.deedsService.createDeed(ownerId, payload.title);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  updateDeed(
    @Body() payload: CreateDeedDto,
    @Param() params,
  ): Promise<DeedModel> {
    const id = params.id;
    return this.deedsService.updateDeed(id, payload.title);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteDeed(@Param() params, @Request() req): Promise<[]> {
    const id = params.id;
    const ownerId = req.user.sub;
    return this.deedsService.deleteDeed(ownerId, id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(@Request() req): Promise<DeedModel[]> {
    const ownerId = req.user.sub;
    return this.deedsService.getAllDeeds(ownerId);
  }
}
