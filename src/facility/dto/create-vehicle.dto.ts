import { IsNotEmpty, IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsDateString()
  datePurchased: Date;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsEnum(['functional', 'under repair', 'discarded', 'sold'])
  status: 'functional' | 'under repair' | 'discarded' | 'sold';
}