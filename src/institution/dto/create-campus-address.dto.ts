import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCampusAddressDto {

    @ApiProperty({})
    @IsNumber()
    longitude: number;

    @ApiProperty({})
    @IsNumber()
    latitude: number;

    @ApiProperty({})
    @IsString()
    streetAddress: string;

    @ApiProperty({})
    @IsString()
    lga: string;

    @ApiProperty({})
    @IsString()
    state: string;

    @IsString()
    @ApiProperty({})
    country: string;
}