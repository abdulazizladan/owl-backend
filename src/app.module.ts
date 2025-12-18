import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './audit/audit.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { InstitutionModule } from './institution/institution.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { FacilityModule } from './facility/facility.module';
import { PaymentModule } from './payment/payment.module';
// import { ClassroomModule } from './classroom/classroom.module';
// import { CalendarModule } from './calendar/calendar.module';
import { AcademicModule } from './academic/academic.module';
import { SchoolManagementModule } from './school-management/school-management.module';
import { AuditModule } from './audit/audit.module';
import { SupportModule } from './support/support.module';
import { HealthModule } from './health/health.module';
import { LibraryModule } from './library/library.module';
import { AssignmentModule } from './assignment/assignment.module';
import { CbtModule } from './cbt/cbt.module';
import { GuardianModule } from './guardian/guardian.module';

@Module({
  imports: [
    AuthModule,
    // InstitutionModule,
    UserModule,
    StudentModule,
    FacilityModule,
    // ClassroomModule,
    // CalendarModule,
    PaymentModule,
    AcademicModule,
    SchoolManagementModule,
    AuditModule,
    SupportModule,
    HealthModule,
    LibraryModule,
    AssignmentModule,
    CbtModule,
    GuardianModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // TODO: Disable in production
    }),

  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule { }
