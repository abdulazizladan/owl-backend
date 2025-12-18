import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { GuardianService } from './guardian.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Guardian')
@Controller('guardian')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class GuardianController {
    constructor(private readonly guardianService: GuardianService) { }

    @Get('wards')
    @Roles(UserRole.GUARDIAN, UserRole.ADMIN)
    @ApiOperation({ summary: 'Get wards associated with logged-in guardian' })
    async getWards(@Request() req) {
        return this.guardianService.getWards(req.user.userId);
    }
}
