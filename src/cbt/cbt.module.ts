import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Question } from './entities/question.entity';
import { Attempt } from './entities/attempt.entity';
import { CbtService } from './cbt.service';
import { CbtController } from './cbt.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Test, Question, Attempt])],
    controllers: [CbtController],
    providers: [CbtService]
})
export class CbtModule { }
