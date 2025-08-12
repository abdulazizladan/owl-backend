import { Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Asset } from './asset.entity';
import { Building } from './building.entity';

@Entity({ name: 'furniture' })
export class Furniture extends Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  material: string;

  // A furniture item belongs to a specific building.
  @ManyToOne(() => Building, (building) => building.furniture)
  @JoinColumn({ name: 'buildingId' })
  building: Building;
}