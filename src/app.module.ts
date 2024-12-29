import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/user/user.service';
//import { EntitiesModule } from 
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstitutionModule } from './institution/institution.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
