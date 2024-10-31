import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
  providers: [PrismaService, GoogleCalendarService],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
