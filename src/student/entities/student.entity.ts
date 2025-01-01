import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Student'})
export class Student {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    firstName: string;

    @Column({})
    middleName: string;

    @Column({})
    lastName: string;

    @Column({})
    gender: 'M' | 'F';

    @Column({})
    dateOfBirth: Date;

    @Column({})
    dateEnrolled: Date;

}
