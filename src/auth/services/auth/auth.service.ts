import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../users/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
        
    }
    
    async login(username: string, password: string): Promise<any> {
        return {username, password};
    }
    
    async register(username: string, password: string): Promise<any> {
        return {username, password};
    }

    async validateUser(username: string, password: string): Promise<any> {
        return {username, password};
    }
}
