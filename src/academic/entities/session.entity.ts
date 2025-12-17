import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Term } from './term.entity';

@Entity({ name: 'session' })
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string; // e.g., "2024/2025"

    @Column('date')
    startDate: Date;

    @Column('date')
    endDate: Date;

    @OneToMany(() => Term, (term) => term.session)
    terms: Term[];
}
