import { Args, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Request } from './models/request.model';

@Resolver()
export class RequestResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Request])
  async allBarbers(
    @Args('barbeiroId', { type: () => String }) id: string,
  ): Promise<{ error: boolean; message: string; data?: any } | null> {
    const requests = await this.databaseService.getAllRequests(id);
    return requests;
  }

  // @Mutation(() => Boolean)
  // async updateStatusBarbershop(
  //   @Args('statusData') statusData: StatusInput,
  // ): Promise<boolean> {
  //   const barbershops =
  //     await this.databaseService.updateStatusOfBarbershop(statusData);

  //   return barbershops;
  // }

  // @Mutation(() => Boolean)
  // async updateStatusBarber(
  //   @Args('statusData') statusData: StatusInput,
  // ): Promise<boolean> {
  //   const barbershops =
  //     await this.databaseService.updateStatusOfBarber(statusData);

  //   return barbershops;
  // }
}
