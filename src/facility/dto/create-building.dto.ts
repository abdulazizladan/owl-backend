import { IsNotEmpty, IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'The name of the building',
    example: 'Science Building A',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Number of floors in the building',
    example: 5,
    minimum: 1,
    maximum: 200
  })
  @IsNotEmpty()
  @IsNumber()
  floors: number;

  @ApiProperty({
    description: 'Total number of rooms in the building',
    example: 50,
    minimum: 1,
    maximum: 1000
  })
  @IsNotEmpty()
  @IsNumber()
  rooms: number;

  @ApiProperty({
    description: 'Date when the building was commissioned',
    example: '2023-01-15',
    format: 'date'
  })
  @IsNotEmpty()
  @IsDateString()
  dateCommissioned: Date;

  @ApiProperty({
    description: 'Current status of the building',
    example: 'operational',
    enum: ['operational', 'under construction', 'closed', 'maintenance']
  })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({
    description: 'UUID of the site where the building is located',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  siteId: string;
}