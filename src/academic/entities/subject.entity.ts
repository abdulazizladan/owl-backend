import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'subject' })
export class Subject {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string; // e.g., "Mathematics"

    @Column({ nullable: true })
    code: string; // e.g., "MTH"
}
