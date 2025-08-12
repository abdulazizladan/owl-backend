import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Term } from './term.entity';

@Entity({ name: 'academic_sessions' })
export class AcademicSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string; // e.g., "2023/2024 Academic Session"

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    // An academic session is made up of multiple terms
    @OneToMany(() => Term, (term) => term.academicSession)
    terms: Term[];
}