import { Module } from '@nestjs/common';
import { Building } from './entities/building.entity';
import { Floor } from './entities/floor.entity';
import { Room } from './entities/room.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingService } from './services/building/building.service';
import { FloorService } from './services/floor/floor.service';
import { RoomService } from './services/room/room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Floor, Room]),
  ],
  controllers: [FacilityController],
  providers: [FacilityService, BuildingService, FloorService, RoomService],
})
export class FacilityModule {}
