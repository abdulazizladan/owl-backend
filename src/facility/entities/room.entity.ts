import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Floor } from "./floor.entity";

@Entity({})
export class Room {
    @PrimaryGeneratedColumn({})
    id: number;

    @ManyToOne(() => Floor, (floor) => floor.rooms)
    floor: Floor;

    @Column({})
    name: string;

    @Column({})
    purpose: string;
}