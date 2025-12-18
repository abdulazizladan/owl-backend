import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GuardianService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async getWards(guardianId: number) {
        const guardian = await this.userRepo.findOne({
            where: { id: guardianId },
            relations: ['wards']
        });
        return guardian ? guardian.wards : [];
    }

    // For other data (payments, results), we'd inject PaymentService/AcademicService
    // or just let frontend query those APIs using StudentID.
    // For completeness, let's proxy or leave it to specific modules filtering by StudentID.
    // But Guardian needs access.
}
