import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './farm.entity';
import { CreateFarmDto } from './farm.dto.entity';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name);

  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async countTotal() {
    return this.farmRepository.count();
  }

  async findAll(
    offset: number,
    limit: number,
    order?: number,
  ): Promise<Array<Farm>> {
    return this.farmRepository.find({
      order: { name: order ? -1 : 1 },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Farm> {
    return this.farmRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async create(log: CreateFarmDto): Promise<Farm> {
    return this.farmRepository.save(log);
  }

  async delete(id: number): Promise<Farm> {
    const log = await this.findOne(id);
    return this.farmRepository.save(log);
  }
}
