import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BarbershopsController } from './barbershops/barbershops.controller';
import { BarbershopsService } from './barbershops/barbershops.service';
import { ServicesController } from './services/services.controller';
import { Services } from './services/services.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicesController, BarbershopsController],
  providers: [Services, BarbershopsService],
})
export class ApiModule {}
