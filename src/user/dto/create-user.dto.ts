import { ApiProperty } from "@nestjs/swagger";
import { CreateInfoDto } from "./create-info.dto";
import { Role } from "../enums/role.enum";
import { CreateContactDto } from "./create-contact.dto";

export class CreateUserDto {
    @ApiProperty({})
    email: string;
    
    @ApiProperty({})
    password: string;

    @ApiProperty(
        {
            enum: [
                "admin", 
                "staff", 
                "student",
                "guardian"
            ],
            default: 'student'
        }
    )
    role: Role;

    @ApiProperty({})
    info: CreateInfoDto

    @ApiProperty({})
    contact: CreateContactDto;
}
