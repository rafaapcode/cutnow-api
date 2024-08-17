import { Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Barbershop } from './models/barbershop.model';

@Resolver()
export class BarbershopResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Barbershop])
  async barbershop(): Promise<Barbershop[]> {
    const barbershops = await this.databaseService.findAll();
    return barbershops;
  }
}
