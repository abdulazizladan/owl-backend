import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TestType } from "../enums/test-type.enum";

export class CreateTestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subjectId: string;

    @ApiProperty()
    @IsNumber()
    durationMinutes: number;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    startDate?: Date;

    @ApiProperty({ required: false })
    @IsDateString()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ enum: TestType, required: false })
    @IsEnum(TestType)
    @IsOptional()
    type?: TestType;
}
