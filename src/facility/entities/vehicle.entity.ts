import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Asset } from './asset.entity';

// Regular entity; no STI via ChildEntity
@Entity({ name: 'vehicles' })
export class Vehicle extends Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column('date')
  datePurchased: Date;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  status: 'functional' | 'under repair' | 'discarded' | 'sold';
}
