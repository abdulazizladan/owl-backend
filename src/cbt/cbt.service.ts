import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Test } from './entities/test.entity';
import { Question } from './entities/question.entity';
import { Attempt } from './entities/attempt.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { TestType } from './enums/test-type.enum';

@Injectable()
export class CbtService {
    constructor(
        @InjectRepository(Test) private testRepo: Repository<Test>,
        @InjectRepository(Question) private questionRepo: Repository<Question>,
        @InjectRepository(Attempt) private attemptRepo: Repository<Attempt>,
    ) { }

    async createQuestion(dto: CreateQuestionDto) {
        const question = this.questionRepo.create({
            ...dto,
            subject: { id: dto.subjectId },
            classLevel: dto.classLevelId ? { id: dto.classLevelId } : null
        });
        return this.questionRepo.save(question);
    }

    async createTest(dto: CreateTestDto) {
        const test = this.testRepo.create({
            ...dto,
            subject: { id: dto.subjectId }
        });
        return this.testRepo.save(test);
    }

    async addQuestionsToTest(testId: number, questionIds: number[]) {
        const test = await this.testRepo.findOne({
            where: { id: testId },
            relations: ['questions']
        });
        if (!test) throw new NotFoundException('Test not found');

        const questions = await this.questionRepo.findBy({ id: In(questionIds) });

        // Merge existing with new
        test.questions = [...test.questions, ...questions];

        // Remove duplicates if any
        test.questions = test.questions.filter((q, index, self) =>
            index === self.findIndex((t) => (
                t.id === q.id
            ))
        );

        return this.testRepo.save(test);
    }

    async getTest(id: number, includeQuestions = false) {
        const relations = ['subject'];
        if (includeQuestions) relations.push('questions');

        const test = await this.testRepo.findOne({
            where: { id },
            relations
        });

        if (!test) throw new NotFoundException('Test not found');

        // Check if active logic? (Optional)

        return test;
    }

    async getQuestionsForTest(testId: number) {
        const test = await this.testRepo.findOne({
            where: { id: testId },
            relations: ['questions']
        });
        if (!test) throw new NotFoundException('Test not found');
        return test.questions;
    }

    // Helper to generate practice test (Optional future feature)
    // async generatePracticeTest(...)

    async submitTest(studentId: number, dto: { testId: number, answers: { questionId: number, option: string }[] }) {
        const test = await this.testRepo.findOne({
            where: { id: dto.testId },
            relations: ['questions']
        });

        if (!test) throw new NotFoundException('Test not found');

        // Verify dates if Fixed
        const now = new Date();
        if (test.type === TestType.FIXED) {
            if (test.startDate && now < test.startDate) throw new Error("Test has not started");
            if (test.endDate && now > test.endDate) throw new Error("Test has ended");
        }

        let score = 0;
        const total = test.questions.length;

        dto.answers.forEach(ans => {
            const q = test.questions.find(q => q.id === ans.questionId);
            if (q && q.correctOption === ans.option) {
                score++;
            }
        });

        const attempt = this.attemptRepo.create({
            student: { id: studentId },
            test: { id: dto.testId },
            score: score // raw score
        });

        return this.attemptRepo.save(attempt);
    }
}
