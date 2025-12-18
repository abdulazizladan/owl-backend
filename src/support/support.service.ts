import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketStatus } from './enums/ticket.enum';

@Injectable()
export class SupportService {
    constructor(
        @InjectRepository(Ticket)
        private ticketRepository: Repository<Ticket>,
    ) { }

    async create(userId: number, createTicketDto: CreateTicketDto) {
        const ticket = this.ticketRepository.create({
            ...createTicketDto,
            userId,
        });
        return this.ticketRepository.save(ticket);
    }

    async findAll() {
        return this.ticketRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findByUser(userId: number) {
        return this.ticketRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
    }

    async findOne(id: number) {
        const ticket = await this.ticketRepository.findOneBy({ id });
        if (!ticket) {
            throw new NotFoundException(`Ticket #${id} not found`);
        }
        return ticket;
    }

    async countActive() {
        // Assuming 'ACTIVE' is the status string or using enum
        return this.ticketRepository.count({ where: { status: TicketStatus.ACTIVE } });
    }

    async update(id: number, updateTicketDto: UpdateTicketDto) {
        const ticket = await this.findOne(id);
        Object.assign(ticket, updateTicketDto);
        return this.ticketRepository.save(ticket);
    }
}
