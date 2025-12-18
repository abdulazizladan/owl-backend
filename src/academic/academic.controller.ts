import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AcademicService } from './academic.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Academic (Teacher)')
@Controller('academic')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class AcademicController {
    constructor(private readonly academicService: AcademicService) { }

    @Get('my-subjects')
    @Roles(UserRole.STAFF, UserRole.ADMIN) // Teacher role
    @ApiOperation({ summary: 'Get subjects assigned to the logged-in teacher' })
    getMySubjects(@Request() req) {
        // req.user should have the userId from JWT strategy
        return this.academicService.getAssignedSubjects(req.user.userId);
    }

    @Post('assessment')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Record assessment/grades for a student' })
    recordAssessment(@Body() body: {
        studentId: number;
        subjectId: string;
        score: number;
        termId: string;
        sessionId: string;
        classArmId: number
    }, @Request() req) {
        return this.academicService.recordAssessment(req.user.userId, body);
    }
}
