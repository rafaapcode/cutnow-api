import { Injectable } from '@nestjs/common';
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
}
