import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Subject } from '../../academic/entities/subject.entity';
import { ClassArm } from '../../academic/entities/class-arm.entity';
import { Session } from '../../academic/entities/session.entity';
import { Term } from '../../academic/entities/term.entity';

@Entity()
export class AcademicRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.academic_records)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => ClassArm)
  @JoinColumn({ name: 'class_arm_id' })
  classArm: ClassArm;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => Term)
  @JoinColumn({ name: 'term_id' })
  term: Term;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ nullable: true })
  grade: string; // A, B, C...

  @Column({ nullable: true })
  remark: string;
}