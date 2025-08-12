import { Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Asset } from './asset.entity';
import { Building } from './building.entity';

@Entity({ name: 'appliances' })
export class Appliance extends Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('date')
  datePurchased: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  priceAtPurchase: number;

  // An appliance belongs to a specific building.
  @ManyToOne(() => Building, (building) => building.appliances)
  @JoinColumn({ name: 'buildingId' })
  building: Building;
}