import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { GoogleCalendarService } from 'src/google-calendar/google-calendar.service';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarService: GoogleCalendarService) {}

  synchronize() {
    try {
      const url = this.calendarService.generateUrl();
      if (url.error) {
        console.log(url);
        throw new InternalServerErrorException('Erro ao gerar a URL');
      }
      return url.url;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Erro Interno');
    }
  }

  async logInUser(code: string) {
    if (!code) {
      throw new NotAcceptableException('O Código é obrigatório');
    }

    const res = await this.calendarService.setCredentials(code);
    if (res.error) {
      throw new InternalServerErrorException(res.message);
    }

    return res.message;
  }

  async createCalendar(emailUser: string, role: string): Promise<boolean> {
    try {
      const isSynchronize = await this.calendarService.calendarIsSynchronize(
        emailUser,
        role,
      );
      if (isSynchronize) {
        return false;
      }

      const createResponse = await this.calendarService.createCalendar(
        emailUser,
        role,
      );

      if (createResponse.error) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
