import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity"; // Teacher
import { Subject } from "../../academic/entities/subject.entity";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'datetime' })
    dueDate: Date;

    @ManyToOne(() => Subject)
    subject: Subject;

    @ManyToOne(() => User)
    teacher: User; // Created by

    @CreateDateColumn()
    createdAt: Date;
}
