import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('facility')
export class FacilityController {
  constructor(
    private readonly facilityService: FacilityService
  ) {}

  @ApiOperation({ summary: 'Create a new building' })
  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilityService.create(createFacilityDto);
  }

  @ApiOperation({ summary: 'Get a list of all buildings' })
  @Get('/buildings')
  findAll() {
    return this.facilityService.findAll();
  }

  @ApiOperation({ summary: 'Get a building by ID' })
  @Get('building/:id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a building' })
  @Patch('building/:id')
  update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDto) {
    return this.facilityService.update(+id, updateFacilityDto);
  }

  @ApiOperation({ summary: 'Delete a building' })
  @Delete('building/:id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }
}
