import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findOneByEmail( email: string ): Promise<any> {
        try {
            const user = await this.userRepository.findOne({where: {email}});
            if(user) {
                return {
                    success: true,
                    data: user
                }
            }else {
                return {
                    success: true,
                    data: null
                }
            }
        }catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    }

    async create(userData: CreateUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = this.userRepository.create(userData);
            return {
                success: true,
                message: "User added successfully"
            }
        } catch(error) {
            return {
                success: false,
                error: error.message
            }
        }
    }
}
