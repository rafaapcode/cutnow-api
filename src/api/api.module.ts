import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleCalendarModule } from 'src/google-calendar/google-calendar.module';
import { BarbershopsController } from './barbershops/barbershops.controller';
import { BarbershopsService } from './barbershops/barbershops.service';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';

@Module({
  imports: [DatabaseModule, GoogleCalendarModule],
  controllers: [BarbershopsController, CalendarController],
  providers: [BarbershopsService, CalendarService],
})
export class ApiModule {}
