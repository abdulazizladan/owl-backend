import { ApiProperty } from "@nestjs/swagger";

export class CreateAssignmentDto {
    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    dueDate: Date;

    @ApiProperty()
    subjectId: string;
}
