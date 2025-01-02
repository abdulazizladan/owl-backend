import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({summary: 'Create student'})
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({summary: 'Fetch all students'})
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Find student by id'})
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Updates student record'})
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete student record'})
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
