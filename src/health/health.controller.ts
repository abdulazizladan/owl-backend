import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Health (Nurse)')
@Controller('health')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Post()
    @Roles(UserRole.STAFF, UserRole.ADMIN) // Assuming Nurse is STAFF for now, or we'd add NURSE role
    @ApiOperation({ summary: 'Create health record' })
    create(@Body() createHealthRecordDto: CreateHealthRecordDto) {
        return this.healthService.create(createHealthRecordDto);
    }

    @Get()
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all health records' })
    findAll() {
        return this.healthService.findAll();
    }

    @Get('student/:studentId')
    @Roles(UserRole.STAFF, UserRole.ADMIN, UserRole.GUARDIAN)
    @ApiOperation({ summary: 'Get health record by student ID' })
    findByStudent(@Param('studentId') studentId: string) {
        return this.healthService.findByStudent(+studentId);
    }

    @Patch(':id')
    @Roles(UserRole.STAFF, UserRole.ADMIN)
    @ApiOperation({ summary: 'Update health record' })
    update(@Param('id') id: string, @Body() updateHealthRecordDto: UpdateHealthRecordDto) {
        return this.healthService.update(+id, updateHealthRecordDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete health record' })
    remove(@Param('id') id: string) {
        return this.healthService.remove(+id);
    }
}
