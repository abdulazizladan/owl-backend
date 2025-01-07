import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Building } from '../../entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BuildingService {
    
    constructor(
        @InjectRepository(Building)
        private readonly buildingRepository: Repository<Building>) {
    }
    
    async create(createBuildingDto: any) {
        try {
            const building = this.buildingRepository.create(createBuildingDto);
            await this.buildingRepository.save(building);
            return building;
            } catch (error) {
                return {
                success: false,
                message: error.message
            }
        }
    }

    async getAll() {
        try {
            return await this.buildingRepository.find();
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async getSummary() {
        try {
            const buildingsCount = await this.buildingRepository.count();
            return {
                buildingsCount: buildingsCount,
            }
        } catch(error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async getOne(id: number) {
        try {
            return await this.buildingRepository.findOne({where: {id}});
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async update(id: number, updateBuildingDto: any) {
        try {
            await this.buildingRepository.update(id, updateBuildingDto);
            return {
                success: true,
                message: "Building updated successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    async remove(id: number) {
        try {
            await this.buildingRepository.delete(id);
            return {
                success: true,
                message: "Building deleted successfully"
            }
        }catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}
