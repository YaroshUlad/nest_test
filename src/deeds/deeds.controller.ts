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

@Controller('deeds')
export class DeedsController {
  constructor(private deedsService: DeedsService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  createDeed(
    @Body() payload: CreateDeedDto,
    @Request() req,
  ): Promise<DeedModel> {
    const ownerId = req.user.sub;
    return this.deedsService.createDeed(ownerId, payload.title);
  }

  @HttpCode(HttpStatus.OK)
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
  deleteDeed(@Param() params): Promise<[]> {
    const id = params.id;
    return this.deedsService.deleteDeed(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll(@Request() req): Promise<DeedModel[]> {
    const ownerId = req.user.sub;
    return this.deedsService.getAllDeeds(ownerId);
  }
}
