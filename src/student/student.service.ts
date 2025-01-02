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

  async findOne(id: number) {
    try {
      const data = await this.studentRepository.findOne({where: { id }});
      if(data) {
        return {
          success: true,
          data: data,
          message: "Student found successfully"
        }
      }else {
        return {
          success: true,
          data: null,
          message: "Student not found"
        }
      }
    } catch(error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      await this.studentRepository.update(id, updateStudentDto);
      return {
        success: true,
        message: "Student updated successfully"
        }
    } catch( error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  /**
   * 
   * @param id  - ID of the student to be deleted
   * @returns Promise resolving to an object with success flag and message.
   */
  async remove(id: number) {
    try {
      await this.studentRepository.delete(id);
      return {
        success: true,
        message: "Student deleted successfully"
      }
    } catch (error) {
      return {
        success: false,
        message: error.message 
      }
    }
  }
}
