import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from './session.entity';

@Entity({ name: 'term' })
export class Term {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // e.g., "First Term"

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @ManyToOne(() => Session, (session) => session.terms)
    @JoinColumn({ name: 'session_id' })
    session: Session;
}
