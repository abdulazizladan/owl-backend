import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFurnitureDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsUUID()
  buildingId: string;
}