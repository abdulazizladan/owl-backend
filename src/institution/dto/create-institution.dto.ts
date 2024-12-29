import { ApiProperty } from "@nestjs/swagger";

export class CreateInstitutionDto {
        @ApiProperty({type: 'integer'})
        id: number;
    
        @ApiProperty({type: 'string', name: 'name', description: 'name of institution'})
        name: string;
        
        @ApiProperty({type: 'string'})
        phone: string;
    
        @ApiProperty({type: 'string'})
        email: string;
    
        @ApiProperty({type: 'string'})
        website: string;
    
        @ApiProperty({type: 'string'})
        logo: string;
    
        @ApiProperty({type: 'integer'})
        foundedYear: number;
}
