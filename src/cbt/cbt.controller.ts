import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CbtService } from './cbt.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { AddQuestionsToTestDto } from './dto/add-questions.dto';

@ApiTags('CBT')
@Controller('cbt')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class CbtController {
    constructor(private readonly cbtService: CbtService) { }

    @Post('question')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    createQuestion(@Body() dto: CreateQuestionDto) {
        return this.cbtService.createQuestion(dto);
    }

    @Post('test')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    createTest(@Body() dto: CreateTestDto) {
        return this.cbtService.createTest(dto);
    }

    @Post('test/:id/questions')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    addQuestions(@Param('id') id: string, @Body() dto: AddQuestionsToTestDto) {
        return this.cbtService.addQuestionsToTest(+id, dto.questionIds);
    }

    @Get('test/:id')
    @Roles(UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN)
    getTest(@Param('id') id: string) {
        // Students might need restricted view (no questions until start?)
        // For now, return metadata. Questions fetched separately.
        return this.cbtService.getTest(+id, false);
    }

    @Get('test/:id/questions')
    @Roles(UserRole.STUDENT, UserRole.STAFF, UserRole.ADMIN)
    getQuestions(@Param('id') id: string) {
        return this.cbtService.getQuestionsForTest(+id);
    }

    @Post('submit')
    @Roles(UserRole.STUDENT)
    submit(@Body() body: { testId: number, answers: { questionId: number, option: string }[] }, @Request() req) {
        return this.cbtService.submitTest(req.user.userId, body);
    }
}
