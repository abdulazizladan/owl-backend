import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; // e.g., "Tuition Fee", "Hostel Fee"

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true }) // Optional: Link to specific session/term if fees vary
    sessionId: number;
}
