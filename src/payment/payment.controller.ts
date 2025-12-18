import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@ApiTags('Payments (Bursary)')
@Controller('payment')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ApiOperation({ summary: 'Record a new payment' })
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payment records' })
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single payment record by ID' })
  @Roles(UserRole.STAFF, UserRole.ADMIN, UserRole.GUARDIAN, UserRole.STUDENT) // Improved access
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(+id);
  }

  // --- Receipt ---
  @Get('receipt/:id')
  @ApiOperation({ summary: 'Generate receipt for a payment' })
  @Roles(UserRole.STAFF, UserRole.ADMIN, UserRole.GUARDIAN)
  async getReceipt(@Param('id') id: string) {
    return await this.paymentService.generateReceipt(+id);
  }

  // --- Fees ---
  @Post('fees')
  @ApiOperation({ summary: 'Create a new Fee type (Bursar)' })
  @Roles(UserRole.STAFF, UserRole.ADMIN)
  async createFee(@Body() body: { name: string; amount: number; description?: string }) {
    return await this.paymentService.createFee(body.name, body.amount, body.description);
  }

  @Get('fees/all')
  @ApiOperation({ summary: 'Get all configured fees' })
  @Roles(UserRole.STAFF, UserRole.ADMIN, UserRole.GUARDIAN)
  async getFees() {
    return await this.paymentService.findAllFees();
  }
}