import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Floor } from "./floor.entity";

@Entity({})
export class Building {
    
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({})
    name: string;

    @Column({})
    campus: string;

    @OneToMany(() => Floor, (floor) => floor.building)
    floors: Floor[];

}
