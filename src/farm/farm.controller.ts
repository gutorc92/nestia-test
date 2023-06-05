import { Controller, Get, Query, Param } from '@nestjs/common';
import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './farm.dto.entity';
import { Response } from '../response.interface';

@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @TypedRoute.Get('')
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('order', new DefaultValuePipe(0), ParseIntPipe) order: number,
  ): Promise<Response<Farm>> {
    const logs = await this.farmService.findAll(offset, limit, order);
    const total = await this.farmService.countTotal();
    return { items: logs, total };
  }

  @TypedRoute.Get('/:id')
  async findOne(@TypedParam('id') id: number): Promise<Farm> {
    return this.farmService.findOne(id);
  }

  @TypedRoute.Post('')
  async create(@TypedBody() createLogDto: CreateFarmDto): Promise<Farm> {
    return this.farmService.create(createLogDto);
  }
}
