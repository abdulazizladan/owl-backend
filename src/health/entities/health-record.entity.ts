import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class HealthRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column({ type: 'text', nullable: true })
    allergies: string;

    @Column({ type: 'text', nullable: true })
    medicalHistory: string;

    @Column({ type: 'text', nullable: true })
    medications: string;

    @Column({ nullable: true })
    bloodGroup: string;

    @Column({ nullable: true })
    genotype: string;

    @UpdateDateColumn()
    lastUpdated: Date;
}
