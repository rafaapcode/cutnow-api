import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarServices: CalendarService) {}

  @Get('')
  synchronize(@Res() res: Response) {
    const url = this.calendarServices.synchronize();
    return res.redirect(url);
  }

  @Get('/calendarcb')
  async loginUser(@Query('code') queryValue: string, @Res() res: Response) {
    await this.calendarServices.logInUser(queryValue);

    return res.redirect('http://localhost:3001/calendar/create');
  }

  @Get('/create')
  async createCalendar(
    @Query() queryValue: { emailUser: string; role: string },
  ) {
    const result = await this.calendarServices.createCalendar(
      queryValue.emailUser,
      queryValue.role,
    );

    if (!result) {
      return { status: false, message: 'Calendário já existente' };
    }

    return { status: true, message: 'Calendário criado !' };
  }
}
