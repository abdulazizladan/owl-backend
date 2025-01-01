import { ApiProperty } from "@nestjs/swagger";

export class CreateInstitutionCampusDto {
    @ApiProperty()
    campus_id: number;
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

}