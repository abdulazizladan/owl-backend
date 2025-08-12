import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Form } from "./form.entity";
import { User } from "src/user/entities/user.entity";

@Entity({name: 'Classroom'})
export class Classroom {

    @PrimaryGeneratedColumn({})
    id: number;

    @ManyToOne(() => Form, form => form.classrooms)
    form: Form;

    @OneToMany(() => User, (user) => user.classroom)
    students: User[];
}