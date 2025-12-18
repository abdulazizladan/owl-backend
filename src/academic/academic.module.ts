import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Term } from './entities/term.entity';
import { ClassLevel } from './entities/class-level.entity';
import { ClassArm } from './entities/class-arm.entity';
import { Subject } from './entities/subject.entity';
import { SubjectAllocation } from './entities/subject-allocation.entity';

import { AcademicService } from './academic.service';
import { AcademicController } from './academic.controller';
import { AcademicRecord } from '../student/entities/academic-record.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Session,
            Term,
            ClassLevel,
            ClassArm,
            Subject,
            SubjectAllocation,
            AcademicRecord // Register here as we use it in service
        ])
    ],
    controllers: [AcademicController],
    providers: [AcademicService],
    exports: [TypeOrmModule, AcademicService]
})
export class AcademicModule { }
