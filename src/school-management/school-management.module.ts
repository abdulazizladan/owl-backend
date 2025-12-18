import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolManagementService } from './school-management.service';
import { SchoolManagementController } from './school-management.controller';
import { SchoolProfile } from './entities/school-profile.entity';
import { InstitutionSettingsController } from './institution-settings.controller';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UserModule } from '../user/user.module';
import { PaymentModule } from '../payment/payment.module'; // Import modules, not services directly in imports
import { SupportModule } from '../support/support.module';
import { Session } from '../academic/entities/session.entity';
import { Term } from '../academic/entities/term.entity';
import { GradingScale } from '../academic/entities/grading-scale.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([SchoolProfile, Session, Term, GradingScale]),
        UserModule,
        PaymentModule,
        SupportModule
    ],
    controllers: [SchoolManagementController, InstitutionSettingsController, DashboardController],
    providers: [SchoolManagementService, DashboardService],
})
export class SchoolManagementModule { }
