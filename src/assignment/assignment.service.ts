import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignment.entity';
import { Submission } from './entities/submission.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto'; // Need to create
import { SubmitAssignmentDto } from './dto/submit-assignment.dto'; // Need to create

@Injectable()
export class AssignmentService {
    constructor(
        @InjectRepository(Assignment)
        private assignmentRepo: Repository<Assignment>,
        @InjectRepository(Submission)
        private submissionRepo: Repository<Submission>,
    ) { }

    async create(teacherId: number, dto: any) {
        const assignment = this.assignmentRepo.create({
            ...dto,
            teacher: { id: teacherId },
            subject: { id: dto.subjectId }
        });
        return this.assignmentRepo.save(assignment);
    }

    async findAllForStudent(classArmId: number) {
        // Find assignments for subjects allocated to this class arm?
        // Simplified: Just find all assignments for now, or filter by Subject if we had logic.
        // Better: Filter by Subject.id where subject matches student's subjects.
        // Ideally, we fetch assignments where assignment.subject IN (student.subjects).
        return this.assignmentRepo.find({ relations: ['subject', 'teacher'] });
    }

    async submit(studentId: number, dto: any) {
        const submission = this.submissionRepo.create({
            ...dto,
            student: { id: studentId },
            assignment: { id: dto.assignmentId }
        });
        return this.submissionRepo.save(submission);
    }

    async findAllSubmissionsForAssignment(assignmentId: number) {
        return this.submissionRepo.find({
            where: { assignment: { id: assignmentId } },
            relations: ['student']
        });
    }
}
