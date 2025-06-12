import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionModule } from './institution/institution.module';
import { UsersModule } from './users/users.module';
import { StudentModule } from './student/student.module';
import { FacilityModule } from './facility/facility.module';
//import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule, 
    InstitutionModule,
    UsersModule,
    StudentModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    FacilityModule,
    //PaymentModule
  ],
  controllers: [
    AppController
    ],
  providers: [
    AppService, 
  ],
})
export class AppModule {}
