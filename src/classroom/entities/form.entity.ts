import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Classroom } from "./classroom.entity";
import { User } from "src/user/entities/user.entity";

@Entity({name: 'Form'})
export class Form {
    @PrimaryColumn({})
    index: number;
    
    @Column({unique: true})
    name: string;

    @OneToMany(() => Classroom, classroom => classroom.form)
    classrooms: Classroom[];

    @OneToOne((type) => User, user => user.form)
    formMaster: User;

}