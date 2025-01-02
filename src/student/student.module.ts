import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { MedicalInformation } from './entities/medical-record.entity';
import { AcademicRecord } from './entities/academic-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, MedicalInformation, AcademicRecord])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
