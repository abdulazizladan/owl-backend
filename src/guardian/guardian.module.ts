import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { GuardianService } from './guardian.service';
import { GuardianController } from './guardian.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [GuardianController],
    providers: [GuardianService]
})
export class GuardianModule { }
