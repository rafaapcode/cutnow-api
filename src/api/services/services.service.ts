import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class Services {
  constructor(private readonly databaseService: DatabaseService) {}

  async getBarbershopServices(id: string) {
    try {
      const allServices = await this.databaseService.barbershopServices(id);

      if (!allServices) {
        return null;
      }
      const newData = allServices.map((service) => ({
        nome: service.nomeService,
        tempo: service.tempoMedio,
        preco: service.preco,
      }));
      return newData;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Erro Interno');
    }
  }
}
