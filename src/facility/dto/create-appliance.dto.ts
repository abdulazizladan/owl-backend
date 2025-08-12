import { IsNotEmpty, IsString, IsDateString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplianceDto {
  @ApiProperty({
    description: 'Brand name of the appliance',
    example: 'Samsung',
    minLength: 1,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Model number/name of the appliance',
    example: 'WF45R6100AW',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Date when the appliance was purchased',
    example: '2023-06-15',
    format: 'date'
  })
  @IsNotEmpty()
  @IsDateString()
  datePurchased: Date;

  @ApiProperty({
    description: 'Purchase price of the appliance',
    example: 899.99,
    minimum: 0,
    maximum: 100000
  })
  @IsNotEmpty()
  @IsNumber()
  priceAtPurchase: number;

  @ApiProperty({
    description: 'UUID of the building where the appliance is located',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  buildingId: string;
}