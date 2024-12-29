import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Campus } from "./campus.entity";
  
  class Principal {
    name: string;
    title: string;
  }
  
  class BoardMember {
    name: string;
    position: string;
  }
  
  @Entity()
  export class Institution {

    @PrimaryColumn({default: 1})
    id: number;

    @Column({})
    name: string;
    
    @Column({})
    phone: string;

    @Column({})
    email: string;

    @Column({})
    website: string;

    @Column({})
    logo: string; // Path to logo image

    @Column({})
    foundedYear: number;

    principal: Principal;
    boardMembers: BoardMember[];

    @OneToMany(() => Campus, campus => campus.instituttion)
    campus: Campus[];
  }
  