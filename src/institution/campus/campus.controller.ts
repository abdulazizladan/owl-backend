import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInstitutionCampusDto } from '../dto/create-campus.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('institution')
export class CampusController {

    @ApiOperation({summary: 'Create new campuses'})
    @Post('campus')
    createCampus(@Body() campus: CreateInstitutionCampusDto) {

    }

    @ApiOperation({summary: 'Get a list of all campuses'})
    @Get(':institution/campus')
    findAll(@Param('institutionID') institutionID: number) {

    }

    @ApiOperation({summary: 'Get campus details'})
    @Get(':institutionID/campus/:id')
    find(@Param('institutionID') institutionID: number, @Param('id') id: number) {

    }

    @ApiOperation({summary: 'Update campus information'})
    @Patch(':institutionID/campus:id')
    update(@Param('id') id: number) {

    }

    @ApiOperation({summary: 'Remove campus information'})
    @Delete(':institutionID/campus:id')
    remove(@Param('id') id: number) {

    }
}
