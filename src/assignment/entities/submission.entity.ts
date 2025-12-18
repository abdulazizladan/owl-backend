import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Assignment } from "./assignment.entity";
import { Student } from "../../student/entities/student.entity";

@Entity()
export class Submission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Assignment)
    assignment: Assignment;

    @ManyToOne(() => Student)
    student: Student;

    @Column({ type: 'text', nullable: true })
    check_url: string; // Link to submission or text content

    @Column({ nullable: true })
    score: number;

    @Column({ nullable: true })
    feedback: string;

    @CreateDateColumn()
    submittedAt: Date;
}
