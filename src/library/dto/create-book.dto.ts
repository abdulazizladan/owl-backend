import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    isbn?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
