import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { BarberInfoUpdate } from './input/updateinfoInput';
import { Barber } from './models/barber.model';

@Resolver()
export class BarberResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => Barber)
  async barber(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Barber | null> {
    const barber = await this.databaseService.barber(id);
    return barber;
  }

  @Mutation(() => Boolean)
  async updateInfoBarber(@Args('informations') informations: BarberInfoUpdate) {
    const updatedBarber =
      await this.databaseService.updateBarberInfo(informations);

    return updatedBarber;
  }
}
