import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSiteDto {
  @ApiProperty({
    description: 'The name of the site',
    example: 'Main Campus',
    minLength: 1,
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Geographic latitude coordinate of the site',
    example: 40.7128,
    minimum: -90,
    maximum: 90
  })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    description: 'Geographic longitude coordinate of the site',
    example: -74.0060,
    minimum: -180,
    maximum: 180
  })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;
}