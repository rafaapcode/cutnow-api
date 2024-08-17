import { Injectable } from '@nestjs/common';
import { Barbearia } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DatabaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Barbearia[]> {
    const barbershops = await this.prismaService.barbearia.findMany({});

    return barbershops;
  }
}
