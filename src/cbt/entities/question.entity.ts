import { ClassLevel } from "../../academic/entities/class-level.entity";
import { Subject } from "../../academic/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Subject)
    subject: Subject;

    @ManyToOne(() => ClassLevel, { nullable: true })
    classLevel: ClassLevel;

    @Column()
    text: string;

    @Column()
    optionA: string;

    @Column()
    optionB: string;

    @Column()
    optionC: string;

    @Column()
    optionD: string;

    @Column()
    correctOption: 'A' | 'B' | 'C' | 'D';
}
