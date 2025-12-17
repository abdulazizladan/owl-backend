import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from './enums/user-role.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * Create a new user.
   * Accessible by ADMIN only.
   * @access ADMIN
   */
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ description: 'User created successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin role allowed.' })
  @ApiOperation({ summary: 'Create user' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Get user stats by role and status.
   * Accessible by ADMIN and STAFF (Director?).
   * @access ADMIN, STAFF
   */
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ description: "User stats found" })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin and director roles allowed.' })
  @ApiOperation({ summary: "Get user stats by role and status" })
  @Get('stats')
  getStats() {
    return this.userService.getStats();
  }

  /**
   * Get all users.
   * Accessible by ADMIN.
   * @access ADMIN
   */
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ description: 'User found' })
  @ApiNoContentResponse({ description: 'No users found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin roles allowed.' })
  @ApiOperation({ summary: 'Find all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Get a user by email.
   * Accessible by ADMIN only.
   * @access ADMIN
   * @param email - The email of the user
   */
  @Roles(UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Find one user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin role allowed.' })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  /**
   * Update a user by email.
   * Accessible by ADMIN only.
   * @access ADMIN
   * @param email - The email of the user
   * @param updateUserDto - DTO containing updated user data
   */
  @Roles(UserRole.ADMIN)
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin role allowed.' })
  @ApiOperation({ summary: 'Update user' })
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  /**
   * Remove a user by email.
   * Accessible by ADMIN only.
   * @access ADMIN
   * @param email - The email of the user
   */
  /*
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remove user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized. JWT is missing or invalid.' })
  @ApiForbiddenResponse({ description: 'Forbidden. Only admin role allowed.' })
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
  */
}
