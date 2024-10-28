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
          const updateDate = {
            ...barber.informacoes,
            ...informations.informations,
            portfolio: barber.informacoes.portfolio || [''],
          };
          console.log(updateDate);
          const res = await tx.barbeiro.update({
            where: { id: informations.id },
            data: {
              informacoes: {
                ...updateDate,
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

  async getAllRequests(id: string): Promise<any> {
    try {
      const requests = await this.prismaService.solicitacoes.findMany({
        where: {
          barbeiro_id: id,
        },
        include: {
          usuario: {
            select: {
              avatar: true,
            },
          },
        },
      });
      if (!requests) {
        return {
          error: true,
          message: 'Nenhuma requisição encontrada',
          data: undefined,
        };
      }

      const newRequests = requests.map(({ usuario: { avatar }, ...info }) => ({
        avatar,
        ...info,
      }));
      return {
        error: false,
        message: 'Solicitações encontradas',
        data: newRequests,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
        data: undefined,
      };
    }
  }

  async createNewSchedule(scheduleData: CreateSchedule): Promise<boolean> {
    try {
      const { requestId, ...info } = scheduleData;
      const queries = [];
      const request = await this.prismaService.solicitacoes.findUnique({
        where: {
          id: requestId,
        },
      });

      if (!request) {
        return false;
      }

      const createSchedule = this.prismaService.agendamentos.create({
        data: info,
      });

      const deleteRequest = this.prismaService.solicitacoes.delete({
        where: {
          id: requestId,
        },
      });

      queries.push(createSchedule);
      queries.push(deleteRequest);
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

  async allScheduleOfBarbershop(barbershopId: string): Promise<any> {
    try {
      const schedules = await this.prismaService.agendamentos.findMany({
        where: {
          barbearia_id: barbershopId,
        },
        select: {
          id: true,
          tipoServico: true,
          nomeCliente: true,
          data: true,
          barbearia_id: true,
          barbeiro_id: true,
          barbeiro: {
            select: {
              nome: true,
            },
          },
          barbearia: {
            select: {
              servicos: {
                select: {
                  tempoMedio: true,
                },
              },
            },
          },
        },
      });

      if (!schedules) {
        return {
          error: true,
          message: 'Nenhum agendamento encontrado',
          data: null,
        };
      }

      const allSchedules = schedules.map((schedule) => {
        return {
          id: schedule.id,
          tipoServico: schedule.tipoServico,
          nomeCliente: schedule.nomeCliente,
          data: schedule.data,
          barbearia_id: schedule.barbearia_id,
          barbeiro_id: schedule.barbeiro_id,
          nomeBarbeiro: schedule.barbeiro.nome,
          tempoMedio: schedule.barbearia.servicos,
        };
      });

      return {
        error: false,
        message: 'Todos os agendamentos',
        data: allSchedules,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  async allScheduleOfBarber(barberId: string): Promise<any> {
    try {
      const schedules = await this.prismaService.agendamentos.findMany({
        where: {
          barbeiro_id: barberId,
        },
        select: {
          id: true,
          tipoServico: true,
          nomeCliente: true,
          data: true,
          barbearia_id: true,
          barbeiro_id: true,
          barbeiro: {
            select: {
              nome: true,
            },
          },
          barbearia: {
            select: {
              servicos: {
                select: {
                  tempoMedio: true,
                },
              },
            },
          },
        },
      });

      if (!schedules) {
        return {
          error: true,
          message: 'Nenhum agendamento encontrado',
          data: null,
        };
      }

      const allSchedules = schedules.map((schedule) => {
        return {
          id: schedule.id,
          tipoServico: schedule.tipoServico,
          nomeCliente: schedule.nomeCliente,
          data: schedule.data,
          barbearia_id: schedule.barbearia_id,
          barbeiro_id: schedule.barbeiro_id,
          nomeBarbeiro: schedule.barbeiro.nome,
          tempoMedio: schedule.barbearia.servicos,
        };
      });

      return {
        error: false,
        message: 'Todos os agendamentos',
        data: allSchedules,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  async allSchedulesOfTodayToBarbershop(barbershopId: string): Promise<any> {
    try {
      const schedules = await this.prismaService.agendamentos.findMany({
        where: {
          AND: [
            {
              barbearia_id: barbershopId,
            },
            {
              data: {
                contains: new Date(Date.now()).toISOString().split('T')[0],
              },
            },
          ],
        },
        select: {
          id: true,
          tipoServico: true,
          nomeCliente: true,
          data: true,
          barbearia_id: true,
          barbeiro_id: true,
          usuario: {
            select: {
              avatar: true,
            },
          },
          barbeiro: {
            select: {
              informacoes: {
                select: {
                  foto: true,
                },
              },
            },
          },
        },
      });

      if (!schedules) {
        return {
          error: true,
          message: 'Nenhum agendamento encontrado',
          data: null,
        };
      }

      const allSchedulesOfBarbershop = schedules.map((schedule) => {
        return {
          id: schedule.id,
          tipoServico: schedule.tipoServico,
          nomeCliente: schedule.nomeCliente,
          data: schedule.data,
          barbearia_id: schedule.barbearia_id,
          barbeiro_id: schedule.barbeiro_id,
          clientAvatar: schedule.usuario.avatar,
          barberAvatar: schedule.barbeiro.informacoes.foto,
        };
      });

      return {
        error: false,
        message: 'Agendamentos encontrados',
        data: allSchedulesOfBarbershop,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }

  async allSchedulesOfTodayToBarber(barberId: string): Promise<any> {
    try {
      const schedules = await this.prismaService.agendamentos.findMany({
        where: {
          AND: [
            {
              barbeiro_id: barberId,
            },
            {
              data: {
                contains: new Date(Date.now()).toISOString().split('T')[0],
              },
            },
          ],
        },
        select: {
          id: true,
          tipoServico: true,
          nomeCliente: true,
          data: true,
          barbearia_id: true,
          barbeiro_id: true,
          usuario: {
            select: {
              avatar: true,
            },
          },
          barbeiro: {
            select: {
              informacoes: {
                select: {
                  foto: true,
                },
              },
            },
          },
        },
      });

      if (!schedules) {
        return {
          error: true,
          message: 'Nenhum agendamento encontrado',
          data: null,
        };
      }

      const allSchedulesOfBarber = schedules.map((schedule) => {
        return {
          id: schedule.id,
          tipoServico: schedule.tipoServico,
          nomeCliente: schedule.nomeCliente,
          data: schedule.data,
          barbearia_id: schedule.barbearia_id,
          barbeiro_id: schedule.barbeiro_id,
          clientAvatar: schedule.usuario.avatar,
          barberAvatar: schedule.barbeiro.informacoes.foto,
        };
      });

      return {
        error: false,
        message: 'Agendamentos encontrados',
        data: allSchedulesOfBarber,
      };
    } catch (error: any) {
      console.log(error.message);
      return {
        error: true,
        message: error.message,
        data: null,
      };
    }
  }
}
