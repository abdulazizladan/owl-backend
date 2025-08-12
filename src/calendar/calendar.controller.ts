import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CalendarService } from '../calendar/calendar.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


@Controller('calendar')
export class CalendarController {

    constructor(private readonly eventService: CalendarService) {}
    @Get()
    @ApiOperation({ summary: 'Get all events' })
    @ApiResponse({ status: 200, description: 'Return all events.', type: [Event] })
    async findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single event by ID' })
    @ApiParam({ name: 'id', description: 'The UUID of the event' })
    @ApiResponse({ status: 200, description: 'Return a single event.', type: Event })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async findOne(@Param('id') id: string): Promise<Event> {
        return this.eventService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiBody({ type: CreateEventDto })
    @ApiResponse({ status: 201, description: 'The event has been successfully created.', type: Event })
    async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventService.create(createEventDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an existing event' })
    @ApiParam({ name: 'id', description: 'The UUID of the event' })
    @ApiBody({ type: UpdateEventDto })
    @ApiResponse({ status: 200, description: 'The event has been successfully updated.', type: Event })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
        return this.eventService.update(id, updateEventDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete an event' })
    @ApiParam({ name: 'id', description: 'The UUID of the event' })
    @ApiResponse({ status: 204, description: 'The event has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Event not found.' })
    async remove(@Param('id') id: string): Promise<void> {
        await this.eventService.remove(id);
    }
}
