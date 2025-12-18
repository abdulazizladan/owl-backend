import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchoolManagementService } from './school-management.service';
import { CreateSchoolProfileDto } from './dto/create-school-profile.dto';
import { UpdateSchoolProfileDto } from './dto/update-school-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('School Management')
@Controller('school-management')
export class SchoolManagementController {
    constructor(private readonly schoolManagementService: SchoolManagementService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create school profile (Admin only)' })
    create(@Body() createSchoolProfileDto: CreateSchoolProfileDto) {
        return this.schoolManagementService.create(createSchoolProfileDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all school profiles (Public/Authenticated)' })
    findAll() {
        // Ideally open to everyone so the frontend can check school info before login
        return this.schoolManagementService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get school profile by ID' })
    findOne(@Param('id') id: string) {
        return this.schoolManagementService.findOne(+id);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update school profile (Admin only)' })
    update(@Param('id') id: string, @Body() updateSchoolProfileDto: UpdateSchoolProfileDto) {
        return this.schoolManagementService.update(+id, updateSchoolProfileDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete school profile (Admin only)' })
    remove(@Param('id') id: string) {
        return this.schoolManagementService.remove(+id);
    }
}
