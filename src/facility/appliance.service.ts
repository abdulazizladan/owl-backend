import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appliance } from './entities/appliance.entity';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { UpdateApplianceDto } from './dto/update-appliance.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class ApplianceService {
  constructor(
    @InjectRepository(Appliance)
    private readonly applianceRepository: Repository<Appliance>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  async create(createApplianceDto: CreateApplianceDto): Promise<Appliance> {
    const building = await this.buildingRepository.findOne({ where: { id: createApplianceDto.buildingId } });
    if (!building) {
      throw new NotFoundException(`Building with ID "${createApplianceDto.buildingId}" not found.`);
    }
    const appliance = this.applianceRepository.create({ ...createApplianceDto, building });
    return this.applianceRepository.save(appliance);
  }

  async findAll(): Promise<Appliance[]> {
    return this.applianceRepository.find({ relations: ['building'] });
  }

  async findOne(id: string): Promise<Appliance> {
    const appliance = await this.applianceRepository.findOne({ where: { id }, relations: ['building'] });
    if (!appliance) {
      throw new NotFoundException(`Appliance with ID "${id}" not found.`);
    }
    return appliance;
  }

  async update(id: string, updateApplianceDto: UpdateApplianceDto): Promise<Appliance> {
    await this.applianceRepository.update(id, updateApplianceDto);
    return this.applianceRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.applianceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appliance with ID "${id}" not found.`);
    }
  }
}