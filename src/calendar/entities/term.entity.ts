import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AcademicSession } from './academic-session.entity';
import { Holiday } from './holiday.entity';

@Entity({ name: 'terms' })
export class Term {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string; // e.g., "First Term", "Second Term"

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    // A term belongs to one academic session
    @ManyToOne(() => AcademicSession, (academicSession) => academicSession.terms)
    @JoinColumn({ name: 'academicSessionId' })
    academicSession: AcademicSession;

    // A term can have multiple holidays
    @OneToMany(() => Holiday, (holiday) => holiday.term)
    holidays: Holiday[];

    // A term can have multiple events
    @OneToMany('Event', (event: any) => event.term)
    events: any[];
}