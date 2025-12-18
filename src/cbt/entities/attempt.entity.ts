import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Test } from "./test.entity";
import { Student } from "../../student/entities/student.entity";

@Entity()
export class Attempt { // Result
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Test)
    test: Test;

    @ManyToOne(() => Student)
    student: Student;

    @Column()
    score: number;

    @CreateDateColumn()
    takenAt: Date;
}
