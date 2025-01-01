import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './entities/institution.entity';
import { Campus } from './entities/campus.entity';
import { Address } from './entities/address.entity';
import { CampusController } from './campus/campus.controller';
import { CampusService } from './campus/campus.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Institution, Campus, Address])
  ],
  controllers: [InstitutionController, CampusController],
  providers: [InstitutionService, CampusService],
})
export class InstitutionModule {}
