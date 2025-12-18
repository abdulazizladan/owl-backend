import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecord } from './entities/health-record.entity';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';

@Injectable()
export class HealthService {
    constructor(
        @InjectRepository(HealthRecord)
        private healthRecordRepository: Repository<HealthRecord>,
    ) { }

    create(createHealthRecordDto: CreateHealthRecordDto) {
        const record = this.healthRecordRepository.create(createHealthRecordDto);
        return this.healthRecordRepository.save(record);
    }

    findAll() {
        return this.healthRecordRepository.find();
    }

    findByStudent(studentId: number) {
        return this.healthRecordRepository.findOneBy({ studentId });
    }

    async update(id: number, updateHealthRecordDto: UpdateHealthRecordDto) {
        const record = await this.healthRecordRepository.findOneBy({ id });
        if (!record) {
            throw new NotFoundException(`Health record #${id} not found`);
        }
        Object.assign(record, updateHealthRecordDto);
        return this.healthRecordRepository.save(record);
    }

    remove(id: number) {
        return this.healthRecordRepository.delete(id);
    }
}
