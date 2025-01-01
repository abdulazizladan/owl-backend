import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { CreateInstitutionCampusDto } from "./create-campus.dto";

export class CreateInstitutionDto {
        @ApiProperty({type: 'integer'})
        id: number;
    
        @ApiProperty({type: 'string', name: 'name', description: 'name of institution'})
        name: string;
        
        @ApiProperty({type: 'string'})
        phone: string;
    
        @ApiProperty({type: 'string', example: 'xxx@xxx.xx'})
        @IsEmail({})
        email: string;
    
        @ApiProperty({type: 'string'})
        website: string;
    
        @ApiProperty({type: 'string'})
        logo: string;
    
        @ApiProperty({type: 'integer'})
        foundedYear: number;

        //@ApiProperty({required: false})
        //campus: CreateInstitutionCampus | null;

}
