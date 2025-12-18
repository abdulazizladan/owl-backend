import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BorrowingRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column()
    bookId: number;

    @CreateDateColumn()
    borrowDate: Date;

    @Column({ nullable: true })
    returnDate: Date;

    @Column({ default: 'BORROWED' }) // BORROWED, RETURNED, OVERDUE
    status: string;
}
