import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PaymentService } from '../payment/payment.service';
import { SupportService } from '../support/support.service';

@Injectable()
export class DashboardService {
    constructor(
        private userService: UserService,
        private paymentService: PaymentService,
        private supportService: SupportService,
    ) { }

    async getSystemStats() {
        // 1. Enrollment (Students)
        const userStats = await this.userService.getStats();
        // userStats keys: total, active, suspended, removed, admin, staff, students, guardians...
        // Adjust based on actual return structure of UserService.getStats(). 
        // It returns { success: true, data: { ... } }
        const enrollment = userStats.success && userStats.data ? userStats.data.students : 0;

        // 2. Revenue
        const revenue = await this.paymentService.calculateTotalRevenue();

        // 3. Active Tickets
        const activeTickets = await this.supportService.countActive();

        return {
            enrollment,
            revenue,
            activeTickets,
        };
    }
}
