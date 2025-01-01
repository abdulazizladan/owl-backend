import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Campus } from "./campus.entity";

@Entity({name: "CampusAddress"})
export class Address {
    
    //@PrimaryGeneratedColumn()
    //address_id: number;

    @OneToOne(() => Campus, campus => campus.address)
    @JoinColumn({name: 'campus_address_id'})
    @PrimaryColumn()
    campus_id: number;

    @Column({})
    street_name: string;

    @Column({})
    lga: string;

    @Column({})
    state: string;

    @Column({})
    country: string;

    @Column({})
    longitude: number;

    @Column({})
    latitude: number;

}
