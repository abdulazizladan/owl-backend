import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'SystemUsers'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column({ default: 'user' }) // Default role
  role: string;
}