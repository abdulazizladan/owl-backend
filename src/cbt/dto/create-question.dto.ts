import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    optionA: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    optionB: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    optionC: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    optionD: string;

    @ApiProperty({ enum: ['A', 'B', 'C', 'D'] })
    @IsEnum(['A', 'B', 'C', 'D'])
    correctOption: 'A' | 'B' | 'C' | 'D';

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subjectId: string; // UUID

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    classLevelId?: number;
}
