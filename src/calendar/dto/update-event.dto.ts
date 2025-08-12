import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {}

// src/event/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Term } from '../entities/term.entity';

@Entity({ name: 'events' })
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // e.g., "Inter-house Sports", "PTA Meeting"

    @Column('date')
    date: Date;

    @Column({ nullable: true })
    description: string;

    // An event belongs to one term
    @ManyToOne(() => Term, (term) => term.events)
    @JoinColumn({ name: 'termId' })
    term: Term;
}