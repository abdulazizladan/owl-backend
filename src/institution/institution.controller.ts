import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Institution')
@UseGuards(AuthGuard)
@Controller('institution')
@ApiBearerAuth()
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @ApiOperation({summary: 'Add institution details', description: ''})
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get()
  @ApiOperation({summary: 'Get institution details', description: ''})
  findAll() {
    return this.institutionService.findAll();
  }
  /*
  @Get(':id')
  @ApiOperation({summary: 'Get single institution details', description: ''})
  findOne(@Param('id') id: string) {
    return this.institutionService.findOne(+id);
  }**/

  @Patch(':id')
  @ApiOperation({summary: 'Update institution details', description: ''})
  update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionService.update(+id, updateInstitutionDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete institution', description: ''})
  remove(@Param('id') id: string) {
    return this.institutionService.remove(+id);
  }
}
