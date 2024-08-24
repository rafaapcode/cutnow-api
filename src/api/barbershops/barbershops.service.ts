import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BarbershopsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getBarbershopInfo(identificador: string) {
    try {
      const info =
        await this.databaseService.barbershopInfoToForm(identificador);
      if (!info) {
        return null;
      }
      return info;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Erro Interno');
    }
  }
}
