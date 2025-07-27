import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus, // Import HttpStatus for clear response codes
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiBearerAuth, // Indicates that this endpoint requires a bearer token
  ApiOperation, // For operation summaries and descriptions
  ApiTags, // For tagging the controller
  ApiResponse, // For documenting responses
  ApiBody, // For documenting request bodies
  ApiParam, // For documenting path parameters
} from '@nestjs/swagger';

// Assuming you have a Student entity/model for response types
// import { Student } from './entities/student.entity'; // Example, adjust path as needed

@ApiTags('Students') // Categorizes all endpoints in this controller under 'Students' tag
//@UseGuards(AuthGuard) // Applies AuthGuard to all routes in this controller
@ApiBearerAuth() // Indicates that all endpoints in this controller require a bearer token
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new student record',
    description: 'Registers a new student in the system. Requires authentication.',
  })
  @ApiBody({ type: CreateStudentDto, description: 'Data for creating a new student.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The student record has been successfully created.',
    // type: Student, // If you have a Student entity, use this to describe the response structure
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the created student.' },
        firstName: { type: 'string', description: 'The first name of the student.' },
        lastName: { type: 'string', description: 'The last name of the student.' },
        email: { type: 'string', format: 'email', description: 'The email address of the student.' },
        // Add other relevant student properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided for student creation.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch all student records',
    description: 'Retrieves a list of all student records in the system. Requires authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of student records.',
    // type: [Student], // If you have a Student entity, use this for an array response
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The ID of the student.' },
          firstName: { type: 'string', description: 'The first name of the student.' },
          lastName: { type: 'string', description: 'The last name of the student.' },
          email: { type: 'string', format: 'email', description: 'The email address of the student.' },
          // Add other relevant student properties here
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while retrieving students.',
  })
  async findAll(): Promise<any[]> {
    // Adjust return type based on what your service actually returns
    return await this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a student record by ID',
    description: 'Retrieves a single student record by its unique identifier. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the student.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The student record details.',
    // type: Student,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the student.' },
        firstName: { type: 'string', description: 'The first name of the student.' },
        lastName: { type: 'string', description: 'The last name of the student.' },
        email: { type: 'string', format: 'email', description: 'The email address of the student.' },
        // Add other relevant student properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async findOne(@Param('id') id: string): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a student record',
    description: 'Updates an existing student record identified by its ID. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the student to update.' })
  @ApiBody({ type: UpdateStudentDto, description: 'Data for updating the student record.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The student record has been successfully updated.',
    // type: Student,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the updated student.' },
        firstName: { type: 'string', description: 'The updated first name of the student.' },
        lastName: { type: 'string', description: 'The updated last name of the student.' },
        // Add other relevant student properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided for update.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a student record',
    description: 'Deletes a student record identified by its ID. This action is irreversible. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the student to delete.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, // 204 No Content is common for successful deletion with no body
    description: 'The student record has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    // Assuming remove method doesn't return anything on success
    await this.studentService.remove(+id);
  }
}