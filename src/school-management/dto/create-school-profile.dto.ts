import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateSchoolProfileDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    streetAddress: string;

    @ApiProperty()
    @IsString()
    lga: string;

    @ApiProperty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    logo?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    slogan?: string;

    @ApiProperty()
    @IsDateString()
    establishedDate: Date;
}
