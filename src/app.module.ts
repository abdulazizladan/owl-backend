import { Module } from '@nestjs/common';
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
  ],
})
export class AppModule { }
