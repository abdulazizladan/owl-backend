import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Furniture } from './entities/furniture.entity';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class FurnitureService {
  constructor(
    @InjectRepository(Furniture)
    private readonly furnitureRepository: Repository<Furniture>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  async create(createFurnitureDto: CreateFurnitureDto): Promise<Furniture> {
    const building = await this.buildingRepository.findOne({ where: { id: createFurnitureDto.buildingId } });
    if (!building) {
      throw new NotFoundException(`Building with ID "${createFurnitureDto.buildingId}" not found.`);
    }
    const furniture = this.furnitureRepository.create({ ...createFurnitureDto, building });
    return this.furnitureRepository.save(furniture);
  }

  async findAll(): Promise<Furniture[]> {
    return this.furnitureRepository.find({ relations: ['building'] });
  }

  async findOne(id: string): Promise<Furniture> {
    const furniture = await this.furnitureRepository.findOne({ where: { id }, relations: ['building'] });
    if (!furniture) {
      throw new NotFoundException(`Furniture with ID "${id}" not found.`);
    }
    return furniture;
  }

  async update(id: string, updateFurnitureDto: UpdateFurnitureDto): Promise<Furniture> {
    await this.furnitureRepository.update(id, updateFurnitureDto);
    return this.furnitureRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.furnitureRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Furniture with ID "${id}" not found.`);
    }
  }
}