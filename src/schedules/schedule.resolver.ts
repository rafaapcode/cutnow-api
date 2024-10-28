import { Args, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Schedules, SchedulesOfToday } from './models/schedule.model';

@Resolver()
export class ScheduleResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Schedules])
  async allSchedulesOfBarbershop(
    @Args('barbeariaId', { type: () => String }) id: string,
  ): Promise<Request[] | null> {
    const schedules = await this.databaseService.allScheduleOfBarbershop(id);
    return schedules.data;
  }

  @Query(() => [Schedules])
  async allSchedulesOfBarber(
    @Args('barbeiroId', { type: () => String }) id: string,
  ): Promise<Request[] | null> {
    const schedules = await this.databaseService.allScheduleOfBarber(id);
    return schedules.data;
  }

  @Query(() => [SchedulesOfToday])
  async allSchedulesOfTodayToBarbershop(
    @Args('barbeariaId', { type: () => String }) id: string,
  ): Promise<Request[] | null> {
    const schedules =
      await this.databaseService.allSchedulesOfTodayToBarbershop(id);
    return schedules.data;
  }

  @Query(() => [SchedulesOfToday])
  async allSchedulesOfTodayToBarber(
    @Args('barbeiroId', { type: () => String }) id: string,
  ): Promise<Request[] | null> {
    const schedules =
      await this.databaseService.allSchedulesOfTodayToBarber(id);
    return schedules.data;
  }
}
