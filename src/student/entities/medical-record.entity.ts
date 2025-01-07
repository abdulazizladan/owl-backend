import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { Student } from "../entities/student.entity";

@Entity()
export class MedicalInformation{
    @PrimaryColumn({name: 'id'})
    studentID: number;

    @Column({})
    blood_group: string;
    
    @Column({})
    genotype: string;

    @OneToOne(() => Student, (student) => student.medical_information)
    @JoinColumn()
    student: Student;
  }