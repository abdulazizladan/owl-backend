import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Site } from './site.entity';
import { Appliance } from './appliance.entity';
import { Furniture } from './furniture.entity';

@Entity({ name: 'buildings' })
export class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  floors: number;

  @Column()
  rooms: number;

  @Column('date')
  dateCommissioned: Date;

  @Column()
  status: string; // e.g., 'operational', 'under construction', 'closed'

  // A building belongs to one site.
  @ManyToOne(() => Site, (site) => site.buildings)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  // A building can have many appliances.
  @OneToMany(() => Appliance, (appliance) => appliance.building)
  appliances: Appliance[];

  // A building can have many furniture items.
  @OneToMany(() => Furniture, (furniture) => furniture.building)
  furniture: Furniture[];
}