import { Args, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
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
}
