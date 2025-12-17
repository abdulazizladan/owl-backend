import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ClassLevel } from "./class-level.entity";
import { User } from "../../user/entities/user.entity";

@Entity({ name: 'class_arm' })
export class ClassArm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // e.g. "Gold", "A"

    @ManyToOne(() => ClassLevel, level => level.classArms)
    classLevel: ClassLevel;

    @OneToMany(() => User, user => user.classArm)
    students: User[];
}
