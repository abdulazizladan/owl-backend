import { IsNotEmpty, IsString, IsNumber, IsDateString, IsUUID, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty({
    description: 'Description of the repair request or maintenance needed',
    example: 'Replace air filter and check engine oil',
    minLength: 10,
    maxLength: 500
  })
  @IsNotEmpty()
  @IsString()
  repairRequest: string;

  @ApiProperty({
    description: 'Cost of the maintenance or repair',
    example: 150.00,
    minimum: 0,
    maximum: 100000
  })
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'Date when the repair or maintenance was performed',
    example: '2023-12-15',
    format: 'date'
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfRepair: Date;

  @ApiProperty({
    description: 'Name of the vendor or service provider who performed the maintenance',
    example: 'ABC Auto Services',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  vendor: string;

  @ApiProperty({
    description: 'UUID of the asset that requires maintenance',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  assetId: string;

  @ApiProperty({
    description: 'Type of asset that requires maintenance',
    example: 'vehicle',
    enum: ['vehicle', 'appliance', 'furniture']
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['vehicle', 'appliance', 'furniture'])
  assetType: 'vehicle' | 'appliance' | 'furniture';
}