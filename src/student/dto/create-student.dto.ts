import { ApiProperty } from "@nestjs/swagger";
import { StudentStatus } from "../enum/studentStatus.enum";

class AcademicRecords {
    @ApiProperty({})
    term: string;

    @ApiProperty({})
    year: number;
}

class MedicalInformation {
    @ApiProperty({})
    blood_group: string;

    @ApiProperty({})
    genotype: string;
}

export class CreateStudentDto {

    @ApiProperty({ description: '' })
    admissionNumber: number;

    @ApiProperty({ description: '' })
    firstName: string;

    @ApiProperty({ description: '' })
    middleName: string;

    @ApiProperty({ description: '' })
    lastName: string;

    @ApiProperty({ description: '' })
    gender: 'M' | 'F';

    @ApiProperty({ default: Date.now() })
    dateOfBirth: Date;

    @ApiProperty({ default: Date.now() })
    dateEnrolled: Date;

    @ApiProperty({ type: 'string' })
    status: StudentStatus;

    // @ApiProperty({ isArray: true})
    // academic_records: AcademicRecords[];

    @ApiProperty({ nullable: true })
    medicalInformation: MedicalInformation;
}
