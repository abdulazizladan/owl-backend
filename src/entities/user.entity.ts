import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

export enum UserRole {
    STUDENT = 'STUDENT',
    STAFF = 'STAFF',
    ADMIN = 'ADMIN',
  }
  
  @Entity({name: 'User'})
  export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    role: UserRole;
  }
  