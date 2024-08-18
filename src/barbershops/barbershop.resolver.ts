import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Barbers } from './models/barber.model';
import { Barbershop } from './models/barbershop.model';
import { Servicos } from './models/servicos.model';
import { ServicosUpdate } from './statusUpdateInput/servicosUpdateInput';
import { StatusInput } from './statusUpdateInput/statusInput';

@Resolver()
export class BarbershopResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Barbers])
  async allBarbers(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Barbers[] | null> {
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

  @Query(() => [Servicos])
  async barbershopServices(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Servicos[] | null> {
    const barbershops = await this.databaseService.barbershopServices(id);
    return barbershops;
  }

  @Mutation(() => Boolean)
  async updateStatusBarbershop(
    @Args('statusData') statusData: StatusInput,
  ): Promise<boolean> {
    const barbershops =
      await this.databaseService.updateStatusOfBarbershop(statusData);

    return barbershops;
  }

  @Mutation(() => Boolean)
  async updateStatusBarber(
    @Args('statusData') statusData: StatusInput,
  ): Promise<boolean> {
    const barbershops =
      await this.databaseService.updateStatusOfBarber(statusData);

    return barbershops;
  }

  @Mutation(() => Boolean)
  async deleteBarber(@Args('id') id: string): Promise<boolean> {
    const barbershops = await this.databaseService.deleteBarber(id);

    return barbershops;
  }

  @Mutation(() => Boolean)
  async updateServices(
    @Args('serviceData') services: ServicosUpdate,
  ): Promise<boolean> {
    const barbershops = await this.databaseService.updateService(services);

    return barbershops;
  }
}
