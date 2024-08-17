import { Injectable } from '@nestjs/common';
import { ServicosUpdate } from 'src/barbershops/statusUpdateInput/servicosUpdateInput';
import { StatusInput } from 'src/barbershops/statusUpdateInput/statusInput';
import { PrismaService } from 'src/prisma.service';

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
    const barbershops = await this.prismaService.barbearia.findUnique({
      where: {
        id,
      },
    });

    return barbershops;
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
}
