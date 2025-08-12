import { Module } from '@nestjs/common';
import { Building } from './entities/building.entity';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from './entities/appliance.entity';
import { Furniture } from './entities/furniture.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Site } from './entities/site.entity';
import { Vehicle } from './entities/vehicle.entity';
import { MaintenanceService } from './maintenance.service';
import { SiteService } from './site.service';
import { BuildingService } from './building.service';
import { ApplianceService } from './appliance.service';
import { FurnitureService } from './furniture.service';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Appliance, 
        Building, 
        Furniture, 
        Maintenance, 
        Site, 
        Vehicle
      ]
    ),
  ],
  controllers: [
    FacilityController
  ],
  providers: [
    FacilityService,
    MaintenanceService,
    SiteService,
    BuildingService,
    ApplianceService,
    FurnitureService,
    VehicleService,
  ],
  exports: [
    FacilityService,
    MaintenanceService,
    SiteService,
    BuildingService,
    ApplianceService,
    FurnitureService,
    VehicleService,
  ]
})
export class FacilityModule {}
