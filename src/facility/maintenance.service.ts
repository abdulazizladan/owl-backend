import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { Vehicle } from './entities/vehicle.entity';
import { Appliance } from './entities/appliance.entity';
import { Furniture } from './entities/furniture.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private readonly maintenanceRepository: Repository<Maintenance>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Appliance)
    private readonly applianceRepository: Repository<Appliance>,
    @InjectRepository(Furniture)
    private readonly furnitureRepository: Repository<Furniture>,
  ) {}

  // This is a helper function to find any type of asset
  private async findAsset(assetId: string, assetType: string): Promise<Vehicle | Appliance | Furniture> {
    switch (assetType) {
      case 'vehicle':
        const vehicle = await this.vehicleRepository.findOne({ where: { id: assetId } });
        if (vehicle) return vehicle;
        break;
      case 'appliance':
        const appliance = await this.applianceRepository.findOne({ where: { id: assetId } });
        if (appliance) return appliance;
        break;
      case 'furniture':
        const furniture = await this.furnitureRepository.findOne({ where: { id: assetId } });
        if (furniture) return furniture;
        break;
    }
    throw new NotFoundException(`Asset with ID "${assetId}" and type "${assetType}" not found.`);
  }

  async create(createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance> {
    const asset = await this.findAsset(createMaintenanceDto.assetId, createMaintenanceDto.assetType);
    
    // Create maintenance record with the appropriate asset relationship
    const maintenanceData: any = {
      ...createMaintenanceDto,
    };
    
    // Set the appropriate asset relationship based on type
    if (createMaintenanceDto.assetType === 'vehicle') {
      maintenanceData.vehicle = asset;
    } else if (createMaintenanceDto.assetType === 'appliance') {
      maintenanceData.appliance = asset;
    } else if (createMaintenanceDto.assetType === 'furniture') {
      maintenanceData.furniture = asset;
    }
    
    const maintenance = this.maintenanceRepository.create(maintenanceData);
    return this.maintenanceRepository.save(maintenance) as any;
  }

  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceRepository.find({ 
      relations: ['vehicle', 'appliance', 'furniture'] 
    });
  }

  async findOne(id: string): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findOne({ 
      where: { id }, 
      relations: ['vehicle', 'appliance', 'furniture'] 
    });
    if (!maintenance) {
      throw new NotFoundException(`Maintenance record with ID "${id}" not found.`);
    }
    return maintenance;
  }

  async update(id: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<Maintenance> {
    await this.maintenanceRepository.update(id, updateMaintenanceDto);
    return this.maintenanceRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.maintenanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Maintenance record with ID "${id}" not found.`);
    }
  }
}