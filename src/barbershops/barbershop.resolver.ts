import { Args, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Barber } from './models/barber.model';
import { Barbershop } from './models/barbershop.model';
import { Servicos } from './models/servicos.model';

@Resolver()
export class BarbershopResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Barber], { nullable: 'itemsAndList' })
  async allBarbers(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Barber[] | null> {
    const barbershops = await this.databaseService.allBarbers(id);
    return barbershops;
  }

  @Query(() => Barbershop)
  async barbershopInfo(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Barbershop> {
    const barbershops = await this.databaseService.barbershopInfo(id);
    return barbershops;
  }

  @Query(() => [Servicos], { nullable: 'itemsAndList' })
  async barbershopServices(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Servicos[] | null> {
    const barbershops = await this.databaseService.barbershopServices(id);
    return barbershops;
  }
}
