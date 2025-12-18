import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketPriority } from '../enums/ticket.enum';

export class CreateTicketDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ enum: TicketPriority, required: false })
    @IsOptional()
    @IsEnum(TicketPriority)
    priority?: TicketPriority;
}
