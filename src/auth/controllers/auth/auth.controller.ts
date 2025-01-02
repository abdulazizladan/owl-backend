import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from '../../auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {

    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({summary: 'User login', description: 'Authenticate user and return a token'})
    login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({summary: 'Get users list'})
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    @ApiOperation({summary: 'Register new user', description: ''})
    register(@Body() data: RegisterDto) {}
}
