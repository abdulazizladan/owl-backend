import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Submission } from './entities/submission.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Assignment, Submission])],
    controllers: [AssignmentController],
    providers: [AssignmentService]
})
export class AssignmentModule { }
