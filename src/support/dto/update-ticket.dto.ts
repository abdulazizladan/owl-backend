import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TicketStatus, TicketPriority } from '../enums/ticket.enum';

export class UpdateTicketDto {
    @ApiProperty({ enum: TicketStatus, required: false })
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @ApiProperty({ enum: TicketPriority, required: false })
    @IsOptional()
    @IsEnum(TicketPriority)
    priority?: TicketPriority;
}
