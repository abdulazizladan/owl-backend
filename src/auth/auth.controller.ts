import { Body, Controller, Post, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// Assuming User entity is correctly imported, though not directly used in the controller's public methods
// import { User } from 'src/user/entities/user.entity';
// import { Role } from 'src/user/enums/role.enum'; // Assuming this is also correct
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger'; // Import ApiBody
import { AuthTokenResponse } from './auth-token.response'; // Import the new response DTO
import { UnauthorizedException, InternalServerErrorException } from '@nestjs/common'; // Specific exceptions

@ApiTags('Auth') // Apply a tag for Swagger grouping
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    /**
     * Handles user login and returns an access token.
     * @param loginDto The DTO containing user credentials.
     * @returns An object with an access_token.
     */
    @ApiOperation({
        summary: 'Login User',
        description: 'Authenticates a user with provided email and password, returning a JWT access token upon success.',
    })
    @ApiBody({ type: LoginDto, description: 'User credentials (email and password)' }) // Document the request body
    @ApiResponse({
        status: HttpStatus.OK, // Use HttpStatus enum for clarity
        description: 'Successful login. Returns a JWT access token.',
        type: AuthTokenResponse, // Document the successful response structure
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized: Invalid credentials provided.',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error: An unexpected error occurred.',
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<AuthTokenResponse> {
        try {
            // The authService.login method is expected to throw UnauthorizedException
            // if credentials are bad.
            const result = await this.authService.login(loginDto);
            return result; // authService.login should return { access_token: string }
        } catch (error) {
            // If authService.login throws UnauthorizedException, re-throw it.
            // Other errors might be internal server errors.
            if (error instanceof UnauthorizedException) {
                throw error; // Re-throw NestJS HTTP exceptions directly
            }
            // Catch any other unexpected errors and return a generic 500
            throw new InternalServerErrorException('An unexpected error occurred during login.');
        }
    }

    /**
     * Placeholder for password reset functionality.
     * @returns A message indicating the status of the password reset request.
     */
    @ApiOperation({
        summary: 'Initiate Password Reset',
        description: 'Requests a password reset for a user. Typically sends an email with a reset link.',
    })
    @ApiBody({
        description: 'Email address for password reset',
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', example: 'user@example.com' },
            },
            required: ['email'],
        },
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Password reset instructions sent (if email exists).',
        // You might define a DTO for this response, e.g., { message: string }
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'If an account with that email exists, a password reset link has been sent.' },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error: An unexpected error occurred.',
    })
    @Post('reset-password')
    async resetPassword(@Body('email') email: string) {
        try {
            // In a real application, you would call a service here:
            // await this.authService.requestPasswordReset(email);
            // It's common practice not to confirm if an email exists for security reasons,
            // to prevent email enumeration attacks.
            return { message: 'If an account with that email exists, a password reset link has been sent.' };
        } catch (error) {
            console.error('Password reset error:', error); // Log the error for debugging
            throw new InternalServerErrorException('Failed to initiate password reset.');
        }
    }
}