import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSchoolProfileDto } from './dto/create-school-profile.dto';
import { UpdateSchoolProfileDto } from './dto/update-school-profile.dto';
import { SchoolProfile } from './entities/school-profile.entity';

@Injectable()
export class SchoolManagementService {
    constructor(
        @InjectRepository(SchoolProfile)
        private schoolProfileRepository: Repository<SchoolProfile>,
    ) { }

    async create(createSchoolProfileDto: CreateSchoolProfileDto) {
        const profile = this.schoolProfileRepository.create(createSchoolProfileDto);
        return this.schoolProfileRepository.save(profile);
    }

    async findAll() {
        return this.schoolProfileRepository.find();
    }

    async findOne(id: number) {
        return this.schoolProfileRepository.findOneBy({ id });
    }

    async update(id: number, updateSchoolProfileDto: UpdateSchoolProfileDto) {
        await this.schoolProfileRepository.update(id, updateSchoolProfileDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        return this.schoolProfileRepository.delete(id);
    }
}
