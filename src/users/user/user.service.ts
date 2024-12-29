import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
//import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        //@Inject('')
    ){}

    /**async findall() Promise<User[]>{
        return
    }*/

    async findOneByEmail( email: string ): Promise<User | null> {
        return
    }
}
