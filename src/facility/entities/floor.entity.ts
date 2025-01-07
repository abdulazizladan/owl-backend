import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Building } from "./building.entity";
import { Room } from "./room.entity";

@Entity({})
export class Floor {
    @PrimaryGeneratedColumn({})
    id: number;
    
    @Column({})
    number: number;

    @ManyToOne(() => Building, (building) => building.floors)
    building: Building;

    @OneToMany(() => Room, (room) => room.floor)
    rooms: Room[];
}