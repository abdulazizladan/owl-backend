import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description: ''})
    email: string;

    @ApiProperty({description: ''})
    password: string;
}