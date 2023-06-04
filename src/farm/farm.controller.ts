import { Body, Controller, Get, Query, Param, Post } from '@nestjs/common';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { FarmService } from './farm.service';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './farm.dto.entity';
import { Response } from '../response.interface';

@Controller('farm')
export class FarmController {
  constructor(private readonly logService: FarmService) {}

  @Get('')
  async findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
    @Query('order', new DefaultValuePipe(0), ParseIntPipe) order: number,
  ): Promise<Response<Farm>> {
    const logs = await this.logService.findAll(offset, limit, order);
    const total = await this.logService.countTotal();
    return { items: logs, total };
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<Farm> {
    return this.logService.findOne(id);
  }

  @Post('')
  async create(@Body() createLogDto: CreateFarmDto): Promise<Farm> {
    return this.logService.create(createLogDto);
  }
}
