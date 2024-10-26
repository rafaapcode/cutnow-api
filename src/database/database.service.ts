import { Injectable } from '@nestjs/common';
import { BarberInfoUpdate } from 'src/barber/input/updateinfoInput';
import { ServicosUpdate } from 'src/barbershops/statusUpdateInput/servicosUpdateInput';
import { StatusInput } from 'src/barbershops/statusUpdateInput/statusInput';
import { PrismaService } from 'src/prisma.service';
import { CreateSchedule } from 'src/requests/requestInputs/CreateSchedule';

@Injectable()
export class DatabaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async allBarbers(id: string): Promise<any> {
    try {
      const barbershops = await this.prismaService.barbearia.findUnique({
        where: {
          id,
        },
        include: {
          barbeiro: {
            select: {
              id: true,
              nome: true,
              informacoes: true,
            },
          },
        },
      });

      return barbershops.barbeiro;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async barbershopInfo(id: string): Promise<any> {
    try {
      const barbershops = await this.prismaService.barbearia.findUnique({
        where: {
          id,
        },
      });

      return barbershops;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async barbershopInfoToForm(id: string): Promise<any> {
    try {
      const barbershops = await this.prismaService.barbearia.findUnique({
        where: {
          id,
        },
        select: {
          cnpj: true,
          email: true,
          nome: true,
          nomeDaBarbearia: true,
          informacoes: {
            select: {
              cep: true,
              bairro: true,
              cidade: true,
              estado: true,
              numero: true,
              rua: true,
              horarioAbertura: true,
              horarioFechamento: true,
            },
          },
        },
      });
      const { informacoes, ...results } = barbershops;
      return { ...results, ...informacoes, numero: `${informacoes.numero}` };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async barbershopServices(id: string): Promise<any> {
    try {
      const barbershops = await this.prismaService.barbearia.findUnique({
        where: {
          id,
        },
        select: {
          servicos: true,
        },
      });
      return barbershops.servicos;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async updateStatusOfBarbershop(updatedata: StatusInput): Promise<boolean> {
    try {
      await this.prismaService.barbearia.update({
        where: {
          id: updatedata.id,
        },
        data: {
          informacoes: {
            update: { status: updatedata.status },
          },
        },
      });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateStatusOfBarber(updatedata: StatusInput): Promise<boolean> {
    try {
      await this.prismaService.barbeiro.update({
        where: {
          id: updatedata.id,
        },
        data: {
          status: updatedata.status,
        },
      });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async deleteBarber(id: string): Promise<boolean> {
    try {
      await this.prismaService.barbeiro.delete({
        where: {
          id,
        },
      });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async updateService(serviceData: ServicosUpdate): Promise<boolean> {
    try {
      await this.prismaService.barbearia.update({
        where: {
          id: serviceData.id,
        },
        data: {
          servicos: serviceData.servicos,
        },
      });

      return true;
    } catch (error) {
      console.log('Database Error: ', error.message);
      return false;
    }
  }

  async barber(id: string): Promise<any> {
    try {
      const barber = await this.prismaService.barbeiro.findUnique({
        where: { id },
        select: {
          email: true,
          cpf: true,
          nome: true,
          status: true,
          informacoes: true,
        },
      });

      if (!barber) {
        return null;
      }

      return barber;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async updateBarberInfo(informations: BarberInfoUpdate): Promise<any> {
    try {
      try {
        await this.prismaService.$transaction(async (tx) => {
          const barber = await tx.barbeiro.findUnique({
            where: { id: informations.id },
            select: {
              informacoes: true,
            },
          });
          if (!barber) {
            return false;
          }
          const res = await tx.barbeiro.update({
            where: { id: informations.id },
            data: {
              informacoes: {
                ...barber.informacoes,
                ...informations.informations,
              },
            },
          });

          if (!res) {
            return false;
          }
        });
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  async getAllRequests(
    id: string,
  ): Promise<{ error: boolean; message: string; data?: any }> {
    try {
      const requests = await this.prismaService.solicitacoes.findMany({
        where: {
          barbeiro_id: id,
        },
      });

      return {
        error: false,
        message: 'Solicitações encontradas',
        data: requests,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async createNewSchedule(scheduleData: CreateSchedule): Promise<boolean> {
    try {
      const { requestId, ...info } = scheduleData;
      const queries = [];
      await this.prismaService.$transaction(async (tx) => {
        const createSchedule = tx.agendamentos.create({
          data: info,
        });
        const deleteRequest = tx.solicitacoes.delete({
          where: {
            id: requestId,
          },
        });

        queries.push(createSchedule);
        queries.push(deleteRequest);
      });

      await Promise.all(queries);

      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  }

  async deleteRequest(requestId: string): Promise<boolean> {
    try {
      const request = await this.prismaService.solicitacoes.findUnique({
        where: { id: requestId },
      });

      if (!request) {
        return false;
      }

      await this.prismaService.solicitacoes.delete({
        where: { id: requestId },
      });

      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}
