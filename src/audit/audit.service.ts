import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(AuditLog)
        private auditLogRepository: Repository<AuditLog>,
    ) { }

    async create(userId: number, action: string, details?: string, ipAddress?: string, status: 'SUCCESS' | 'ERROR' = 'SUCCESS', method?: string, path?: string) {
        const log = this.auditLogRepository.create({
            userId,
            action,
            details,
            ipAddress,
            status,
            method,
            path
        });
        return this.auditLogRepository.save(log);
    }

    async findAll(userId?: number) {
        if (userId) {
            return this.auditLogRepository.find({ where: { userId }, order: { timestamp: 'DESC' } });
        }
        return this.auditLogRepository.find({ order: { timestamp: 'DESC' } });
    }
}
