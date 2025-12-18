import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GradingScale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grade: string; // e.g., "A", "B"

    @Column()
    minScore: number; // e.g., 70

    @Column()
    maxScore: number; // e.g., 100

    @Column({ nullable: true })
    remark: string; // e.g., "Excellent"
}
