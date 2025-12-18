import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Support')
@Controller('support')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @Post()
    @ApiOperation({ summary: 'Create a support ticket' })
    create(@Request() req, @Body() createTicketDto: CreateTicketDto) {
        return this.supportService.create(req.user.sub, createTicketDto);
    }

    @Get('my-tickets')
    @ApiOperation({ summary: 'Get current user tickets' })
    findMyTickets(@Request() req) {
        return this.supportService.findByUser(req.user.sub);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Get all tickets (Admin only)' })
    findAll() {
        return this.supportService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.ADMIN) // Or user owning the ticket, but keeping simple for now
    @ApiOperation({ summary: 'Get ticket by ID' })
    findOne(@Param('id') id: string) {
        return this.supportService.findOne(+id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update ticket status/priority (Admin only)' })
    update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
        return this.supportService.update(+id, updateTicketDto);
    }
}
