import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiProperty({})
    firstName: string;

    @ApiProperty({})
    middleName: string;

    @ApiProperty({})
    lastName: string;

    @ApiProperty({})
    gender: 'M' | 'F';

    @ApiProperty({default: Date.now()})
    dateOfBirth: Date;

    @ApiProperty({default: Date.now()})
    dateEnrolled: Date;
}
