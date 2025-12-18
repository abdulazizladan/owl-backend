import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHealthRecordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    allergies?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    medicalHistory?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    medications?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    bloodGroup?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    genotype?: string;
}
