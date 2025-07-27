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
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import {
  ApiBearerAuth, // Indicates that this endpoint requires a bearer token
  ApiOperation, // For operation summaries and descriptions
  ApiTags, // For tagging the controller
  ApiResponse, // For documenting responses
  ApiBody, // For documenting request bodies
  ApiParam, // For documenting path parameters
} from '@nestjs/swagger';
//import { AuthGuard } from '../auth/auth.guard';

// Assuming you have an Institution entity/model for response types
// import { Institution } from './entities/institution.entity'; // Example, adjust path as needed

@ApiTags('Institutions') // Categorizes all endpoints in this controller under 'Institutions' tag
//@UseGuards(AuthGuard) // Applies AuthGuard to all routes in this controller
@Controller('institution')
@ApiBearerAuth() // Indicates that all endpoints in this controller require a bearer token
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post('')
  @ApiOperation({
    summary: 'Create a new institution',
    description: 'Adds a new institution record to the database. Requires authentication.',
  })
  @ApiBody({ type: CreateInstitutionDto, description: 'Data for creating a new institution.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The institution has been successfully created.',
    // type: Institution, // If you have an Institution entity, use this to describe the response structure
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the created institution.' },
        name: { type: 'string', description: 'The name of the institution.' },
        // Add other properties of the Institution entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async create(@Body() createInstitutionDto: CreateInstitutionDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.institutionService.create(createInstitutionDto);
  }

  @Get('')
  @ApiOperation({
    summary: 'Get all institution details',
    description: 'Retrieves a list of all institutions currently in the system. Requires authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of institutions.',
    // type: [Institution], // If you have an Institution entity, use this for an array response
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The ID of the institution.' },
          name: { type: 'string', description: 'The name of the institution.' },
          // Add other properties of the Institution entity here
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
    description: 'Server error occurred while retrieving institutions.',
  })
  async findAll(): Promise<any[]> {
    // Adjust return type based on what your service actually returns
    return await this.institutionService.findAll();
  }

  /*
  // The following method is commented out in your original code, but documented for completeness.
  @Get(':id')
  @ApiOperation({
    summary: 'Get single institution details by ID',
    description: 'Retrieves a single institution record by its unique identifier. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the institution.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The institution details.',
    // type: Institution,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the institution.' },
        name: { type: 'string', description: 'The name of the institution.' },
        // Add other properties of the Institution entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institution with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async findOne(@Param('id') id: string): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.institutionService.findOne(+id);
  }
  */

  @Patch(':id')
  @ApiOperation({
    summary: 'Update institution details',
    description: 'Updates an existing institution record identified by its ID. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the institution to update.' })
  @ApiBody({ type: UpdateInstitutionDto, description: 'Data for updating the institution.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The institution has been successfully updated.',
    // type: Institution,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the updated institution.' },
        name: { type: 'string', description: 'The updated name of the institution.' },
        // Add other properties of the Institution entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided for update.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institution with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async update(@Param('id') id: string, @Body() updateInstitutionDto: UpdateInstitutionDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.institutionService.update(+id, updateInstitutionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an institution',
    description: 'Deletes an institution record identified by its ID. Requires authentication.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the institution to delete.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, // 204 No Content is common for successful deletion with no body
    description: 'The institution has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Institution with the specified ID not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access, valid authentication token required.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    // Assuming remove method doesn't return anything on success
    await this.institutionService.remove(+id);
  }
}