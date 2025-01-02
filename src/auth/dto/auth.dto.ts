import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDto {

    @IsEmail()
    @ApiProperty({type: 'string', example: 'abdulazizladan@gmail.com'})
    email: string;

    @ApiProperty({type: 'string', example: 'password'})
    password: string;

}

export class RegisterDto {

    @IsEmail()
    @ApiProperty({type: 'string', example: '***@***.***'})
    email: string;

    @ApiProperty({type: 'string', example: '********'})
    password: string;;
}