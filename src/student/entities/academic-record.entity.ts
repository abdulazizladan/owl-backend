import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Student } from '../entities/student.entity';

@Entity()
export class AcademicRecord {
  @PrimaryColumn({})
  id: string;

  @Column({})
  term: string;

  @Column({})
  year: number;

  // ... other academic record fields

  @ManyToOne(() => Student, (student) => student.academic_records)
  student: Student;
}