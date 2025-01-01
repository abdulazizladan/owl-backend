import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
    @Post('login')
    @ApiOperation({summary: 'User login', description: ''})
    login(@Body() data: LoginDto) {}

    @Post('register')
    @ApiOperation({summary: 'Register user', description: ''})
    register(@Body() data: RegisterDto) {}
}
