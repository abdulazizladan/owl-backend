import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus, // Import HttpStatus for clear response codes
  // UseGuards, // Uncomment if authentication is required for these routes
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags, // For tagging the controller
  ApiOperation, // For operation summaries and descriptions
  ApiResponse, // For documenting responses
  ApiBody, // For documenting request bodies
  ApiParam, // For documenting path parameters
  ApiBearerAuth, // Uncomment if authentication is required
} from '@nestjs/swagger';

// Assuming you have a Payment entity/model for response types
// import { Payment } from './entities/payment.entity'; // Example, adjust path as needed

@ApiTags('Payments') // Categorizes all endpoints in this controller under 'Payments' tag
// @UseGuards(AuthGuard) // Uncomment and import AuthGuard if authentication is required for these routes
// @ApiBearerAuth() // Uncomment if authentication is required for these routes
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new payment record',
    description: 'Initiates and records a new payment transaction.',
  })
  @ApiBody({ type: CreatePaymentDto, description: 'Data for creating a new payment.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The payment has been successfully recorded.',
    // type: Payment, // If you have a Payment entity, use this to describe the response structure
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the created payment.' },
        amount: { type: 'number', format: 'float', description: 'The payment amount.' },
        currency: { type: 'string', description: 'The currency of the payment (e.g., "USD", "EUR").' },
        status: { type: 'string', description: 'The current status of the payment (e.g., "pending", "completed").' },
        // Add other relevant payment properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided for payment creation.',
  })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized access, valid authentication token required.',
  // }) // Uncomment if authentication is required
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all payment records',
    description: 'Retrieves a list of all payment transactions in the system.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'A list of payment records.',
    // type: [Payment], // If you have a Payment entity, use this for an array response
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The ID of the payment.' },
          amount: { type: 'number', format: 'float', description: 'The payment amount.' },
          currency: { type: 'string', description: 'The currency of the payment.' },
          status: { type: 'string', description: 'The current status of the payment.' },
          // Add other relevant payment properties here
        },
      },
    },
  })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized access, valid authentication token required.',
  // }) // Uncomment if authentication is required
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server error occurred while retrieving payments.',
  })
  async findAll(): Promise<any[] | void> {
    // Adjust return type based on what your service actually returns
    //return await this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a single payment record by ID',
    description: 'Retrieves a single payment transaction by its unique identifier.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the payment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The payment details.',
    // type: Payment,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the payment.' },
        amount: { type: 'number', format: 'float', description: 'The payment amount.' },
        currency: { type: 'string', description: 'The currency of the payment.' },
        status: { type: 'string', description: 'The current status of the payment.' },
        // Add other relevant payment properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Payment with the specified ID not found.',
  })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized access, valid authentication token required.',
  // }) // Uncomment if authentication is required
  async findOne(@Param('id') id: string): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update payment details',
    description: 'Updates an existing payment record identified by its ID. Useful for status changes or corrections.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the payment to update.' })
  @ApiBody({ type: UpdatePaymentDto, description: 'Data for updating the payment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The payment has been successfully updated.',
    // type: Payment,
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'The ID of the updated payment.' },
        amount: { type: 'number', format: 'float', description: 'The updated payment amount.' },
        status: { type: 'string', description: 'The updated status of the payment.' },
        // Add other relevant payment properties here
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data provided for update.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Payment with the specified ID not found.',
  })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized access, valid authentication token required.',
  // }) // Uncomment if authentication is required
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<any> {
    // Adjust return type based on what your service actually returns
    return await this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a payment record',
    description: 'Deletes a payment record identified by its ID. Use with caution.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the payment to delete.' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT, // 204 No Content is common for successful deletion with no body
    description: 'The payment has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Payment with the specified ID not found.',
  })
  // @ApiResponse({
  //   status: HttpStatus.UNAUTHORIZED,
  //   description: 'Unauthorized access, valid authentication token required.',
  // }) // Uncomment if authentication is required
  async remove(@Param('id') id: string): Promise<void> {
    // Assuming remove method doesn't return anything on success
    await this.paymentService.remove(+id);
  }
}