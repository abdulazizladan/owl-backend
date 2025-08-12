import { IsNotEmpty, IsString, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateApplianceDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsDateString()
  datePurchased: Date;

  @IsNotEmpty()
  @IsNumber()
  priceAtPurchase: number;

  @IsNotEmpty()
  @IsUUID()
  buildingId: string;
}