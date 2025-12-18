import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../academic/entities/session.entity';
import { Term } from '../academic/entities/term.entity';
import { GradingScale } from '../academic/entities/grading-scale.entity';

@ApiTags('Institution Settings')
@Controller('institution-settings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class InstitutionSettingsController {
    constructor(
        @InjectRepository(Session)
        private sessionRepository: Repository<Session>,
        @InjectRepository(Term)
        private termRepository: Repository<Term>,
        @InjectRepository(GradingScale)
        private gradingScaleRepository: Repository<GradingScale>,
    ) { }

    // --- Sessions ---
    @Post('sessions')
    @ApiOperation({ summary: 'Create new session' })
    createSession(@Body() body: Partial<Session>) {
        return this.sessionRepository.save(this.sessionRepository.create(body));
    }

    @Get('sessions')
    @ApiOperation({ summary: 'Get all sessions' })
    getSessions() {
        return this.sessionRepository.find();
    }

    // --- Terms ---
    @Post('terms')
    @ApiOperation({ summary: 'Create new term' })
    createTerm(@Body() body: Partial<Term>) {
        return this.termRepository.save(this.termRepository.create(body));
    }

    @Get('terms')
    @ApiOperation({ summary: 'Get all terms' })
    getTerms() {
        return this.termRepository.find({ relations: ['session'] });
    }

    // --- Grading Scales ---
    @Post('grading-scales')
    @ApiOperation({ summary: 'Create grading scale' })
    createGradingScale(@Body() body: Partial<GradingScale>) {
        return this.gradingScaleRepository.save(this.gradingScaleRepository.create(body));
    }

    @Get('grading-scales')
    @ApiOperation({ summary: 'Get grading scales' })
    getGradingScales() {
        return this.gradingScaleRepository.find({ order: { minScore: 'DESC' } });
    }
}
