import { ApiProperty } from "@nestjs/swagger";
import { CreateInfoDto } from "./create-info.dto";
import { UserRole } from "../enums/user-role.enum";
import { CreateContactDto } from "./create-contact.dto";

export class CreateUserDto {
    @ApiProperty({})
    email: string;

    @ApiProperty({})
    password: string;

    @ApiProperty(
        {
            enum: UserRole,
            default: UserRole.STUDENT
        }
    )
    role: UserRole;

    @ApiProperty({})
    info: CreateInfoDto

    @ApiProperty({})
    contact: CreateContactDto;
}
