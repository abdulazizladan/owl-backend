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
  ) { }

  /**
   * 
   * @param userData 
   * @returns 
   */
  async validateUser(loginDto: LoginDto): Promise<Omit<User, 'password_hash'> | null> {
    // Retrieve user including the password field
    const user = await this.usersService.findByEmail(loginDto.email);
    // Ensure user.data exists and compare with password_hash
    if (user && user.data && await bcrypt.compare(loginDto.password, user.data.password_hash)) {
      const { password_hash, ...result } = user.data; // Use user.data, remove password_hash
      console.log(result)
      return result;
    }
    return null;
  }

  /**
   *
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto): Promise<{ access_token: string, role: any }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    // Check if 'user' is null OR if 'user.data' is null/undefined
    if (!user || !user.data) {
      throw new UnauthorizedException('Invalid credentials'); // More specific error
    }

    const match = await bcrypt.compare(loginDto.password, user.data.password_hash);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials'); // More specific error
    } else {
      const payload = {
        email: user.data.email,
        sub: user.data.id,
        role: user.data.role
      };
      return {
        access_token: this.jwtService.sign(payload),
        role: user.data.role
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

