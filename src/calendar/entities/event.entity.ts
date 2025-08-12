import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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
    @ManyToOne('Term', (term: any) => term.events)
    @JoinColumn({ name: 'termId' })
    term: any;
} 