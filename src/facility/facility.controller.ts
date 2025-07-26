import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus, // Import HttpStatus for clear response codes
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import {
  ApiTags, // For tagging the controller
  ApiOperation, // For operation summaries and descriptions
  ApiResponse, // For documenting responses
  ApiBody, // For documenting request bodies
  ApiParam, // For documenting path parameters
} from '@nestjs/swagger'; // Make sure you have these imports

// Assuming you have a Facility entity/model for response types
// import { Facility } from './entities/facility.entity'; // Example, adjust path as needed

@ApiTags('Facilities') // Tag all endpoints in this controller under 'Facilities'
@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new facility', description: 'Creates a new facility record in the database.' })
  @ApiBody({ type: CreateFacilityDto, description: 'Data for creating a new facility.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The facility has been successfully created.',
    // type: Facility, // If you have a Facility entity, use this to describe the response structure
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the created facility.' },
        name: { type: 'string', description: 'The name of the facility.' },
        // Add other properties of the Facility entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async create(@Body() createFacilityDto: CreateFacilityDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.facilityService.create(createFacilityDto);
  }

  @Get('/buildings') // Changed endpoint path for clarity if it's specifically for buildings
  @ApiOperation({ summary: 'Get a list of all facilities', description: 'Retrieves a list of all facilities currently in the system.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of facilities.',
    // type: [Facility], // If you have a Facility entity, use this for an array response
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The ID of the facility.' },
          name: { type: 'string', description: 'The name of the facility.' },
          // Add other properties of the Facility entity here
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error.',
  })
  async findAll(): Promise<any[] | void> {
    // Adjust return type based on what your service actually returns
    //return await this.facilityService.findAll();
  }

  @Get(':id') // Changed from 'building/:id' to just ':id' for consistency with resource
  @ApiOperation({ summary: 'Get a facility by ID', description: 'Retrieves a single facility by its unique ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the facility.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The facility details.',
    // type: Facility,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the facility.' },
        name: { type: 'string', description: 'The name of the facility.' },
        // Add other properties of the Facility entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Facility not found.',
  })
  async findOne(@Param('id') id: string): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.facilityService.findOne(+id);
  }

  @Patch(':id') // Changed from 'building/:id' to just ':id'
  @ApiOperation({ summary: 'Update a facility', description: 'Updates an existing facility record identified by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the facility to update.' })
  @ApiBody({ type: UpdateFacilityDto, description: 'Data for updating the facility.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The facility has been successfully updated.',
    // type: Facility,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the updated facility.' },
        name: { type: 'string', description: 'The updated name of the facility.' },
        // Add other properties of the Facility entity here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Facility not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.facilityService.update(+id, updateFacilityDto);
  }

  @Delete(':id') // Changed from 'building/:id' to just ':id'
  @ApiOperation({ summary: 'Delete a facility', description: 'Deletes a facility record identified by its ID.' })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the facility to delete.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, // 204 No Content is common for successful deletion with no body
    description: 'The facility has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Facility not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    // Assuming remove method doesn't return anything on success
    await this.facilityService.remove(+id);
  }
}