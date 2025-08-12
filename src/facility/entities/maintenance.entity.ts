import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Appliance } from './appliance.entity';
import { Furniture } from './furniture.entity';

@Entity({ name: 'maintenance' })
export class Maintenance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repairRequest: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('date')
  dateOfRepair: Date;

  @Column()
  vendor: string;

  // The maintenance record is for a single asset.
  // Using union types to reference specific asset types
  @ManyToOne(() => Vehicle, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'vehicleId' })
  vehicle?: Vehicle;

  @ManyToOne(() => Appliance, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'applianceId' })
  appliance?: Appliance;

  @ManyToOne(() => Furniture, { cascade: true, eager: true, nullable: true })
  @JoinColumn({ name: 'furnitureId' })
  furniture?: Furniture;
}