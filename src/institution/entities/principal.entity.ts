import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Principal {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({})
    yearAppointed: number;

    @Column({nullable: true, default: null})
    yearTerminated: number;
}