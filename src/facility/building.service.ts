import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Site } from './entities/site.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Site)
    private readonly siteRepository: Repository<Site>,
  ) {}

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const site = await this.siteRepository.findOne({ where: { id: createBuildingDto.siteId } });
    if (!site) {
      throw new NotFoundException(`Site with ID "${createBuildingDto.siteId}" not found.`);
    }
    const building = this.buildingRepository.create({ ...createBuildingDto, site });
    return this.buildingRepository.save(building);
  }

  async findAll(): Promise<Building[]> {
    return this.buildingRepository.find({ relations: ['site'] });
  }

  async findOne(id: string): Promise<Building> {
    const building = await this.buildingRepository.findOne({ where: { id }, relations: ['site'] });
    if (!building) {
      throw new NotFoundException(`Building with ID "${id}" not found.`);
    }
    return building;
  }

  async update(id: string, updateBuildingDto: UpdateBuildingDto): Promise<Building> {
    await this.buildingRepository.update(id, updateBuildingDto);
    return this.buildingRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.buildingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Building with ID "${id}" not found.`);
    }
  }
}