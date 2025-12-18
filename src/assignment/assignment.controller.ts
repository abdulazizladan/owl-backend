import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Assignments')
@Controller('assignment')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) { }

    @Post()
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    create(@Body() body: any, @Request() req) {
        return this.assignmentService.create(req.user.userId, body);
    }

    @Get()
    @Roles(UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN)
    findAll(@Request() req) {
        // Ideally filter by student class if student
        return this.assignmentService.findAllForStudent(0);
    }

    @Post('submit')
    @Roles(UserRole.STUDENT)
    submit(@Body() body: any, @Request() req) {
        return this.assignmentService.submit(req.user.userId, body);
    }

    @Get('submissions/:assignmentId')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    getSubmissions(@Param('assignmentId') id: string) {
        return this.assignmentService.findAllSubmissionsForAssignment(+id);
    }
}
