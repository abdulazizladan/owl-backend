import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '../../auth.guard';
  import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiBearerAuth,
  } from '@nestjs/swagger'; // Import necessary Swagger decorators
  import { LoginDto, RegisterDto } from '../../dto/auth.dto'; // Assuming dto is in parent dir, adjusted path
  import { AuthService } from '../../services/auth/auth.service';
  import { Public } from '../../decorators/public.decorator';
  
  @ApiTags('Auth') // Categorizes all endpoints in this controller under 'Auth' tag
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User login', description: 'Authenticate user and return an access token' })
    @ApiBody({ type: LoginDto, description: 'User credentials for login' }) // Describes the expected request body
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Successful login, returns an access token.',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', description: 'JWT access token' },
        },
      },
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials.',
    })
    async login(@Body() data: LoginDto): Promise<{ access_token: string }> {
      // Changed return type to Promise<{ access_token: string }> for better type safety and consistency
      const result = await this.authService.login(data);
      return { access_token: result.access_token }; // Assuming login returns an object with access_token
    }
  
    @ApiBearerAuth() // Indicates that this endpoint requires a bearer token for authentication
    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiOperation({ summary: 'Get user profile', description: 'Retrieve the authenticated user\'s profile information' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'User profile retrieved successfully.',
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'number', description: 'The user ID' },
          username: { type: 'string', description: 'The user\'s username' },
          // Add other relevant user profile properties here
        },
      },
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized access, no token or invalid token provided.',
    })
    getProfile(@Request() req: any) {
      // Using 'any' for req for simplicity, ideally you'd have a custom type for req.user
      return req.user;
    }
  
    @Public() // Assuming registration is publicly accessible
    @Post('register')
    @ApiOperation({ summary: 'Register new user', description: 'Create a new user account' })
    @ApiBody({ type: RegisterDto, description: 'New user registration details' })
    @ApiResponse({
      status: HttpStatus.CREATED, // Typically, successful registration returns 201 Created
      description: 'User registered successfully.',
    })
    @ApiResponse({
      status: HttpStatus.CONFLICT, // If username/email already exists
      description: 'User with provided details already exists.',
    })
    @ApiResponse({
      status: HttpStatus.BAD_REQUEST, // For validation errors
      description: 'Invalid registration data provided.',
    })
    async register(@Body() data: RegisterDto): Promise<void> {
      // Assuming register method in service handles the registration logic and doesn't return anything specific on success
      //await this.authService.register(data);
      // You might want to return a success message or the created user's ID
    }
  }