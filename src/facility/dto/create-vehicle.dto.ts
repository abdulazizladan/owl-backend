import { IsNotEmpty, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Type of vehicle',
    example: 'School Bus',
    enum: ['School Bus', 'Van', 'Car', 'Truck', 'Motorcycle', 'Other']
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Date when the vehicle was purchased',
    example: '2022-03-20',
    format: 'date'
  })
  @IsNotEmpty()
  @IsDateString()
  datePurchased: Date;

  @ApiProperty({
    description: 'Model of the vehicle',
    example: 'Sprinter 2500',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({
    description: 'Brand/manufacturer of the vehicle',
    example: 'Mercedes-Benz',
    minLength: 1,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'Current operational status of the vehicle',
    example: 'functional',
    enum: ['functional', 'under repair', 'discarded', 'sold']
  })
  @IsNotEmpty()
  @IsEnum(['functional', 'under repair', 'discarded', 'sold'])
  status: 'functional' | 'under repair' | 'discarded' | 'sold';
}