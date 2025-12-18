import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SchoolProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    streetAddress: string;

    @Column()
    lga: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    slogan: string;

    @Column()
    establishedDate: Date;
}
