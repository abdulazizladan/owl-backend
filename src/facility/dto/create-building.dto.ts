import { IsNotEmpty, IsString, IsNumber, IsDateString, IsUUID } from 'class-validator';

export class CreateBuildingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  floors: number;

  @IsNotEmpty()
  @IsNumber()
  rooms: number;

  @IsNotEmpty()
  @IsDateString()
  dateCommissioned: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsUUID()
  siteId: string;
}