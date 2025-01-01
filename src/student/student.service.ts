import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {

  }

  /**
   * 
   * @param createStudentDto 
   * @returns 
   */
  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.studentRepository.create(createStudentDto);
      await this.studentRepository.save(student);
      return {
        success: true,
        data: student,
        message: "Studded added successfully"
      }
    }catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 
   * @returns Promise resolving to an object with success flag, data (array of fetched students) and message.
   */
  async findAll(): Promise<any> {
    try {
      const students = await this.studentRepository.find({});
      if(students.length == 0) {
        return {
          success: true,
          data: null,
          message: "No students found"
        }
      }else {
        return {
          success: true,
          data: students,
          message: "Students found successfully"
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
