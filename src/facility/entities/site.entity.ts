import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Building } from './building.entity';

@Entity({ name: 'sites' })
export class Site {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  latitude: number; // Geolocation latitude

  @Column('float')
  longitude: number; // Geolocation longitude

  // A site can have many buildings.
  @OneToMany(() => Building, (building) => building.site)
  buildings: Building[];
}