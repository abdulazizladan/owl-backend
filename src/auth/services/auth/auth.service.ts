import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../users/user/user.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {
        
    }
    
    async login(data: LoginDto): Promise<{access_token: string}> {
        const user = await this.userService.findOneByEmail(data.email);
        if(user?.data.password !== data.password) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
    
    async register(username: string, password: string): Promise<any> {
        //const user = await this.
    }

    async validateUser(username: string, password: string): Promise<any> {
        return {username, password};
    }
}
