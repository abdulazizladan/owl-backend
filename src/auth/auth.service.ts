import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
  constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}
    
      /**
       * 
       * @param userData 
       * @returns 
       */
      async validateUser(loginDto: LoginDto): Promise<Omit<User, 'password'> | null> {
        // Retrieve user including the password field
        const user = await this.usersService.findByEmail(loginDto.email);
        if (user && await bcrypt.compare(loginDto.password, user.data.password)) {
          const { password, ...result } = user;
          console.log(result)
          return result;
        }
        return null;
        /**const isPasswordValid = await bcrypt.compare(loginDto.password, user.data.password);
        if (!isPasswordValid) {
          return null;
        }
        // Return user without password
        const { password, ...result } = user;
        return result;**/
      }
    
      /**
       *
       * @param loginDto
       * @returns
       */
      async login(loginDto: LoginDto): Promise<{access_token: string}> {
        const user = await this.usersService.findByEmail(loginDto.email);

        // --- IMPORTANT CHANGE HERE ---
        // Check if 'user' is null OR if 'user.data' is null/undefined
        if (!user || !user.data) {
          throw new UnauthorizedException('Invalid credentials'); // More specific error
        }

        const match = await bcrypt.compare(loginDto.password, user.data.password);
        if (!match) {
          throw new UnauthorizedException('Invalid credentials'); // More specific error
        } else {
          const payload = {
            email: user.data.email,
            password: user.data.password, // Be cautious about including password in JWT payload
            sub: user.data.id,
            role: user.data.role
          };
          return {
            access_token: this.jwtService.sign(payload)
          }
        }
      }
        /**try{
        const user = await this.validateUser(loginDto);
        if (!user) {
          throw new UnauthorizedException('Invalid credentials');
        } else
        return {
          access_token: this.jwtService.sign({ ...user }),
        };
        } catch (error) {
          return {
            success: false,
            message: error.message
          }
        }**/
      }

