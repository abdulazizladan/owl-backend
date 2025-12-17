import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Subject } from './subject.entity';
import { ClassArm } from './class-arm.entity';
import { Session } from './session.entity';
import { Term } from './term.entity';

@Entity({ name: 'subject_allocation' })
export class SubjectAllocation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'staff_id' })
    staff: User;

    @ManyToOne(() => Subject)
    @JoinColumn({ name: 'subject_id' })
    subject: Subject;

    @ManyToOne(() => ClassArm)
    @JoinColumn({ name: 'class_arm_id' })
    classArm: ClassArm;

    @ManyToOne(() => Session)
    @JoinColumn({ name: 'session_id' })
    session: Session;

    @ManyToOne(() => Term, { nullable: true })
    @JoinColumn({ name: 'term_id' })
    term: Term; // Optional if allocation is for whole session
}
