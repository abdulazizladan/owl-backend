import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionModule } from './institution/institution.module';
import { UsersModule } from './users/users.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    AuthModule, 
    InstitutionModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UserService],
})
export class AppModule {}
