import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BorrowBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    studentId: number;
}
