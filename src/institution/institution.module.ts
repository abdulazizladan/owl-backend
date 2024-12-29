import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Campus } from './entities/campus.entity';
import { Address } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution, Campus, Address])
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
