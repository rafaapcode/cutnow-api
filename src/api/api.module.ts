import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleCalendarModule } from 'src/google-calendar/google-calendar.module';
import { CalendarController } from './barbershops copy/calendar.controller';
import { CalendarService } from './barbershops copy/calendar.service';
import { BarbershopsController } from './barbershops/barbershops.controller';
import { BarbershopsService } from './barbershops/barbershops.service';

@Module({
  imports: [DatabaseModule, GoogleCalendarModule],
  controllers: [BarbershopsController, CalendarController],
  providers: [BarbershopsService, CalendarService],
})
export class ApiModule {}
