import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number; // ID of the user performing the action

    @Column()
    action: string; // e.g., "LOGIN", "CREATE_USER", "UPDATE_SETTINGS"

    @Column({ nullable: true })
    details: string; // JSON string or description of the change

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ default: 'SUCCESS' })
    status: 'SUCCESS' | 'ERROR';

    @Column({ nullable: true })
    method: string; // GET, POST, etc

    @Column({ nullable: true })
    path: string; // URL path

    @CreateDateColumn()
    timestamp: Date;
}
