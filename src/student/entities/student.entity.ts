import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm";
import { StudentStatus } from "../enum/studentStatus.enum";
import { MedicalInformation } from "./medical-record.entity";
import { AcademicRecord } from "./academic-record.entity";

@Entity({name: 'Student'})
export class Student {
    @PrimaryGeneratedColumn({name: 'student_id'})
    id: number;

    @Column({unique: true, nullable: false})
    admissionNumber: number;

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

    @Column({ default: StudentStatus.ACTIVE })
    status: StudentStatus;

    @Column({nullable: true})
    dateGraduated: Date;    

    @OneToMany(() => AcademicRecord, (academicRecord) => academicRecord.student)
    academic_records: AcademicRecord[];

    @OneToOne(() => MedicalInformation, (medicalInformation) => medicalInformation.student)
    medical_information: MedicalInformation;

}
