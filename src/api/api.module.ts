import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BarbershopsController } from './barbershops/barbershops.controller';
import { BarbershopsService } from './barbershops/barbershops.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BarbershopsController],
  providers: [BarbershopsService],
})
export class ApiModule {}
