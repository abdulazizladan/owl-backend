import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Subject } from "../../academic/entities/subject.entity";
import { TestType } from "../enums/test-type.enum";
import { Question } from "./question.entity";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Subject)
    subject: Subject;

    @Column()
    durationMinutes: number; // e.g., 60

    @Column({ type: 'datetime', nullable: true })
    startDate: Date;

    @Column({ type: 'datetime', nullable: true })
    endDate: Date;

    @Column({
        type: 'text',
        default: TestType.FIXED
    })
    type: TestType;

    @ManyToMany(() => Question)
    @JoinTable({ name: 'test_questions' })
    questions: Question[];

    @Column({ default: true })
    isActive: boolean;
}
