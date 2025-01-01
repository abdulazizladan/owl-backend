import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDto {

    @IsEmail()
    @ApiProperty({type: 'string', example: '***@***.***'})
    email: string;

    @ApiProperty({type: 'string', example: '********'})
    password: string;

}

export class RegisterDto {

    @IsEmail()
    @ApiProperty({type: 'string', example: '***@***.***'})
    email: string;

    @ApiProperty({type: 'string', example: '********'})
    password: string;;
}