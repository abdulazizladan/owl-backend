import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SiteService } from './site.service';
import { BuildingService } from './building.service';
import { ApplianceService } from './appliance.service';
import { FurnitureService } from './furniture.service';
import { VehicleService } from './vehicle.service';
import { MaintenanceService } from './maintenance.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { CreateApplianceDto } from './dto/create-appliance.dto';
import { UpdateApplianceDto } from './dto/update-appliance.dto';
import { CreateFurnitureDto } from './dto/create-furniture.dto';
import { UpdateFurnitureDto } from './dto/update-furniture.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@ApiTags('Facilities')
@Controller('facility')
export class FacilityController {
  constructor(
    private readonly siteService: SiteService,
    private readonly buildingService: BuildingService,
    private readonly applianceService: ApplianceService,
    private readonly furnitureService: FurnitureService,
    private readonly vehicleService: VehicleService,
    private readonly maintenanceService: MaintenanceService,
  ) {}

  // Sites
  @ApiOperation({ summary: 'Create site' })
  @Post('sites')
  createSite(@Body() dto: CreateSiteDto) {
    return this.siteService.create(dto);
  }

  @ApiOperation({ summary: 'List sites' })
  @Get('sites')
  findAllSites() {
    return this.siteService.findAll();
  }

  @ApiOperation({ summary: 'Get site by id' })
  @Get('sites/:id')
  findSite(@Param('id') id: string) {
    return this.siteService.findOne(id);
  }

  @ApiOperation({ summary: 'Update site' })
  @Patch('sites/:id')
  updateSite(@Param('id') id: string, @Body() dto: UpdateSiteDto) {
    return this.siteService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete site' })
  @Delete('sites/:id')
  removeSite(@Param('id') id: string) {
    return this.siteService.remove(id);
  }

  // Buildings
  @ApiOperation({ summary: 'Create building' })
  @Post('buildings')
  createBuilding(@Body() dto: CreateBuildingDto) {
    return this.buildingService.create(dto);
  }

  @ApiOperation({ summary: 'List buildings' })
  @Get('buildings')
  findAllBuildings() {
    return this.buildingService.findAll();
  }

  @ApiOperation({ summary: 'Get building by id' })
  @Get('buildings/:id')
  findBuilding(@Param('id') id: string) {
    return this.buildingService.findOne(id);
  }

  @ApiOperation({ summary: 'Update building' })
  @Patch('buildings/:id')
  updateBuilding(@Param('id') id: string, @Body() dto: UpdateBuildingDto) {
    return this.buildingService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete building' })
  @Delete('buildings/:id')
  removeBuilding(@Param('id') id: string) {
    return this.buildingService.remove(id);
  }

  // Appliances
  @ApiOperation({ summary: 'Create appliance' })
  @Post('appliances')
  createAppliance(@Body() dto: CreateApplianceDto) {
    return this.applianceService.create(dto);
  }

  @ApiOperation({ summary: 'List appliances' })
  @Get('appliances')
  findAllAppliances() {
    return this.applianceService.findAll();
  }

  @ApiOperation({ summary: 'Get appliance by id' })
  @Get('appliances/:id')
  findAppliance(@Param('id') id: string) {
    return this.applianceService.findOne(id);
  }

  @ApiOperation({ summary: 'Update appliance' })
  @Patch('appliances/:id')
  updateAppliance(@Param('id') id: string, @Body() dto: UpdateApplianceDto) {
    return this.applianceService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete appliance' })
  @Delete('appliances/:id')
  removeAppliance(@Param('id') id: string) {
    return this.applianceService.remove(id);
  }

  // Furniture
  @ApiOperation({ summary: 'Create furniture' })
  @Post('furniture')
  createFurniture(@Body() dto: CreateFurnitureDto) {
    return this.furnitureService.create(dto);
  }

  @ApiOperation({ summary: 'List furniture' })
  @Get('furniture')
  findAllFurniture() {
    return this.furnitureService.findAll();
  }

  @ApiOperation({ summary: 'Get furniture by id' })
  @Get('furniture/:id')
  findFurniture(@Param('id') id: string) {
    return this.furnitureService.findOne(id);
  }

  @ApiOperation({ summary: 'Update furniture' })
  @Patch('furniture/:id')
  updateFurniture(@Param('id') id: string, @Body() dto: UpdateFurnitureDto) {
    return this.furnitureService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete furniture' })
  @Delete('furniture/:id')
  removeFurniture(@Param('id') id: string) {
    return this.furnitureService.remove(id);
  }

  // Vehicles
  @ApiOperation({ summary: 'Create vehicle' })
  @Post('vehicles')
  createVehicle(@Body() dto: CreateVehicleDto) {
    return this.vehicleService.create(dto);
  }

  @ApiOperation({ summary: 'List vehicles' })
  @Get('vehicles')
  findAllVehicles() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Get vehicle by id' })
  @Get('vehicles/:id')
  findVehicle(@Param('id') id: string) {
    return this.vehicleService.findOne(id);
  }

  @ApiOperation({ summary: 'Update vehicle' })
  @Patch('vehicles/:id')
  updateVehicle(@Param('id') id: string, @Body() dto: UpdateVehicleDto) {
    return this.vehicleService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete vehicle' })
  @Delete('vehicles/:id')
  removeVehicle(@Param('id') id: string) {
    return this.vehicleService.remove(id);
  }

  // Maintenance
  @ApiOperation({ summary: 'Create maintenance record' })
  @Post('maintenance')
  createMaintenance(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @ApiOperation({ summary: 'List maintenance records' })
  @Get('maintenance')
  findAllMaintenance() {
    return this.maintenanceService.findAll();
  }

  @ApiOperation({ summary: 'Get maintenance record by id' })
  @Get('maintenance/:id')
  findMaintenance(@Param('id') id: string) {
    return this.maintenanceService.findOne(id);
  }

  @ApiOperation({ summary: 'Update maintenance record' })
  @Patch('maintenance/:id')
  updateMaintenance(@Param('id') id: string, @Body() dto: UpdateMaintenanceDto) {
    return this.maintenanceService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete maintenance record' })
  @Delete('maintenance/:id')
  removeMaintenance(@Param('id') id: string) {
    return this.maintenanceService.remove(id);
  }
}