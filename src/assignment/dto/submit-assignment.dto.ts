import { ApiProperty } from "@nestjs/swagger";

export class SubmitAssignmentDto {
    @ApiProperty()
    assignmentId: number;

    @ApiProperty({ required: false })
    check_url?: string; // or content text
}
