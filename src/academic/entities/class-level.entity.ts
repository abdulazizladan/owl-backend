import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassArm } from "./class-arm.entity";

@Entity({ name: 'class_level' })
export class ClassLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string; // e.g. "JSS 1"

    @OneToMany(() => ClassArm, arm => arm.classLevel)
    classArms: ClassArm[];
}
