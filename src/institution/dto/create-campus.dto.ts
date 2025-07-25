import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateCampusAddressDto } from "./create-campus-address.dto";

export class CreateInstitutionCampusDto {
    @ApiProperty({})
    campus_id: number;
    

    @ApiProperty({nullable: false})
    @IsString({})
    name: string;

    @ApiProperty()
    @IsString({})
    code: string;

    @ApiProperty({type: CreateCampusAddressDto})
    address: CreateCampusAddressDto;

}