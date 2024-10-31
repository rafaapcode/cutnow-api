import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma.service';

type Response = {
  error: boolean;
  message: string;
  url?: string | null;
};

type ResponseCalendarMethods = {
  error: boolean;
  message: string;
};

@Injectable()
export class GoogleCalendarService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  private oauthclient = new google.auth.OAuth2(
    this.configService.get('CLIENT_ID'),
    this.configService.get('SECRET_ID'),
    this.configService.get('REDIRECT_URL'),
  );

  generateUrl(): Response {
    try {
      const url = this.oauthclient.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      return {
        error: false,
        message: 'Url  criada com sucesso !',
        url,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
        url: null,
      };
    }
  }

  async setCredentials(code: string): Promise<Response> {
    try {
      const token = await this.oauthclient.getToken(code);
      if (!token.tokens) {
        return {
          error: true,
          message: 'Erro ao pegar o Token',
        };
      }

      this.oauthclient.setCredentials(token.tokens);

      return {
        error: false,
        message: 'Logged in',
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async createCalendar(
    emailUser: string,
    role: string,
  ): Promise<ResponseCalendarMethods> {
    try {
      const calendar = google.calendar({
        version: 'v3',
        auth: this.oauthclient,
      });

      let user;

      if (role === 'barbershop') {
        user = await this.prisma.barbearia.findFirst({
          where: { email: emailUser },
        });

        if (!user) {
          return {
            error: true,
            message: 'Barbearia não encontrada',
          };
        }
      } else {
        user = await this.prisma.barbeiro.findFirst({
          where: { email: emailUser },
        });

        if (!user) {
          return {
            error: true,
            message: 'Barbearia não encontrada',
          };
        }
      }

      const createdCalendar = await calendar.calendarList.insert({
        requestBody: {
          description: 'CutNow Calendar',
          summary: 'CutNow Calendar',
        },
      });

      if (!createdCalendar.data) {
        return {
          error: true,
          message: 'Erro ao criar o calendário',
        };
      }

      if (role === 'barbershop') {
        await this.prisma.barbearia.update({
          where: { email: emailUser },
          data: {
            sinchronizeCalendar: true,
            calendarId: createdCalendar.data.id,
          },
        });
      } else {
        await this.prisma.barbeiro.update({
          where: { email: emailUser },
          data: {
            sinchronizeCalendar: true,
            calendarId: createdCalendar.data.id,
          },
        });
      }

      return {
        error: false,
        message: 'Calendário criado e sincronizado com sucesso',
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async calendarIsSynchronize(
    emailUser: string,
    role: string,
  ): Promise<boolean> {
    try {
      let isSynchronize = false;
      if (role === 'barbershop') {
        const userCalendar = await this.prisma.barbearia.findFirst({
          where: { email: emailUser },
          select: {
            sinchronizeCalendar: true,
          },
        });

        if (userCalendar.sinchronizeCalendar) {
          isSynchronize = userCalendar.sinchronizeCalendar;
        }
      } else {
        const userCalendar = await this.prisma.barbeiro.findFirst({
          where: { email: emailUser },
          select: {
            sinchronizeCalendar: true,
          },
        });

        if (userCalendar.sinchronizeCalendar) {
          isSynchronize = userCalendar.sinchronizeCalendar;
        }
      }

      return isSynchronize;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createEvents(emailUser: string, role: string) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauthclient });
    // calendar.
    // calendar.events.
  }
}
