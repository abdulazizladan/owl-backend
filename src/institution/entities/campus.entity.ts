import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Institution } from "./institution.entity";
import { Address } from "./address.entity";

@Entity()
export class Campus {
    @PrimaryGeneratedColumn()
    campus_id: number;

    @Column({})
    name: string;

    @Column({})
    code: string;

    @OneToOne(() => Address, {cascade: true})
    address: Address;

    @ManyToOne(() => Institution, institution => institution.campus)
    instituttion: Institution;
}