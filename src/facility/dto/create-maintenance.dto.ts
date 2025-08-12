import { IsNotEmpty, IsString, IsNumber, IsDateString, IsUUID, IsIn } from 'class-validator';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  @IsString()
  repairRequest: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsDateString()
  dateOfRepair: Date;

  @IsNotEmpty()
  @IsString()
  vendor: string;

  @IsNotEmpty()
  @IsUUID()
  assetId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['vehicle', 'appliance', 'furniture'])
  assetType: 'vehicle' | 'appliance' | 'furniture';
}