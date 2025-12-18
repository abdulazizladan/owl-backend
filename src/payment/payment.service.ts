import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Fee } from './entities/fee.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) { }

  // --- Payments ---
  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto as any);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find();
  }

  findOne(id: number) {
    return this.paymentRepository.findOneBy({ id });
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id, updatePaymentDto);
  }

  remove(id: number) {
    return this.paymentRepository.delete(id);
  }

  async calculateTotalRevenue() {
    const result = await this.paymentRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.status = :status', { status: 'completed' })
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async generateReceipt(paymentId: number) {
    const payment = await this.findOne(paymentId);
    if (!payment) throw new NotFoundException('Payment not found');

    let feeName = 'General Payment';
    if (payment.feeId) {
      const fee = await this.feeRepository.findOneBy({ id: payment.feeId });
      if (fee) feeName = fee.name;
    }

    return {
      receiptId: `RCPT-${payment.id}-${Date.now()}`,
      studentId: payment.userId,
      amount: payment.amount,
      description: feeName,
      date: payment.createdAt,
      status: payment.status
    };
  }

  // --- Fees ---
  createFee(name: string, amount: number, description?: string) {
    const fee = this.feeRepository.create({ name, amount, description });
    return this.feeRepository.save(fee);
  }

  findAllFees() {
    return this.feeRepository.find();
  }
}
