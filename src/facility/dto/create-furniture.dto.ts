import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFurnitureDto {
  @ApiProperty({
    description: 'Type of furniture item',
    example: 'Office Chair',
    enum: ['Office Chair', 'Desk', 'Table', 'Cabinet', 'Shelf', 'Bench', 'Other']
  })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Material used to make the furniture',
    example: 'Wood',
    enum: ['Wood', 'Metal', 'Plastic', 'Fabric', 'Leather', 'Glass', 'Other']
  })
  @IsNotEmpty()
  @IsString()
  material: string;

  @ApiProperty({
    description: 'UUID of the building where the furniture is located',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  buildingId: string;
}