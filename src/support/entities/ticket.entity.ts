import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketStatus, TicketPriority } from "../enums/ticket.enum";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number; // User who created the ticket

    @Column()
    subject: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'text', // sqlite uses text for enums usually, or simple varchar
        default: TicketStatus.ACTIVE
    })
    status: TicketStatus;

    @Column({
        type: 'text',
        default: TicketPriority.MEDIUM
    })
    priority: TicketPriority;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
