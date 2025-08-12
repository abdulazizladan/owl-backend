import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Term } from './term.entity';

@Entity({ name: 'holidays' })
export class Holiday {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // e.g., "Christmas Break", "Mid-Term Break"

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    // A holiday belongs to one term
    @ManyToOne(() => Term, (term) => term.holidays)
    @JoinColumn({ name: 'termId' })
    term: Term;
}