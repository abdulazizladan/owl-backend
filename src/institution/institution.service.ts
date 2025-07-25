import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Repository } from 'typeorm';
import { Institution } from './entities/institution.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Service responsible for managing Institution entities.
 * This service provides methods for creating, retrieving, updating, and deleting institutions.
 */
@Injectable()
export class InstitutionService {

  /**
   * Injects the TypeORM repository for the Institution entity.
   * 
   * @param institutionRepository - Repository for Institution entities.
   */
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>
  ) {}

  /**
   * Creates a new Institution entity based on the provided CreateInstitutionDto.
   * 
   * @param createInstitutionDto - DTO containing data for the new Institution.
   * @returns Promise resolving to an object with success flag, data (created Institution), and message.
   */
  async create(createInstitutionDto: CreateInstitutionDto): Promise<any> {
    try {
      // Transform campus to array if present
      const institutionData: any = { ...createInstitutionDto };
      if (institutionData.campus) {
        institutionData.campus = [institutionData.campus];
      } else {
        institutionData.campus = [];
      }
      const institution = this.institutionRepository.create(institutionData);
      await this.institutionRepository.save(institution);
      return {
        success: true,
        data: institution,
        message: "Institution created successfully"
      }
    }catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * Retrieves all Institution entities from the database.
   * 
   * @returns Promise resolving to an object with success flag, data (array of fetched Institutions), and message.
   */
  async findAll(): Promise<any> {
    try {
      const institution = await this.institutionRepository.find({ relations: ["campus", "campus.address"] });
      if(institution.length === 0) {
        return {
          success: true,
          data: null,
          message: "No records found"
        }
      }else{
        return {
          success: true,
          data: institution[0],
          message: "Institution fetched successfully"
        }
      }
    }catch (error) {
      return {
        success: false,
        message: error.messgae
      }
    }
  }

  /**
   * Retrieves a specific Institution entity by its ID.
   * 
   * @param id - ID of the Institution to retrieve.
   * @returns Promise resolving to an object with success flag, data (fetched Institution or null), and message.
   */
  async findOne(id: number): Promise<any> {
    try {
      const data = await this.institutionRepository.findOne({ where: { id }, relations: ["campus"] });
      if(data) {
        return {
          success: true,
          data,
          message: "Institution fetched successfully"
        }
      }else{
        return {
          success: true,
          data,
          message: "No records found"
        }
      }
    }catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * Updates an existing Institution entity based on the provided ID and UpdateInstitutionDto.
   * 
   * @param id - ID of the Institution to update.
   * @param updateInstitutionDto - DTO containing updated data for the Institution.
   * @returns Promise resolving to an object with success flag and message.
   */
  async update(id: number, updateInstitutionDto: UpdateInstitutionDto): Promise<any> {
    try {
      // Transform campus to array if present
      const updateData: any = { ...updateInstitutionDto };
      if (updateData.campus) {
        updateData.campus = [updateData.campus];
      }
      await this.institutionRepository.update(id, updateData);
      return {
        success: true,
        message: "Institution updated successfully"
      }
    }catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * Deletes an Institution entity by its ID.
   * 
   * @param id - ID of the Institution to delete.
   * @returns Promise resolving to an object with success flag and message.
   */
  async remove(id: number): Promise<any> {
    try {
      await this.institutionRepository.delete(id);
      return {
        success: true,
        message: "Institution deleted successfully"
      }
    }catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}