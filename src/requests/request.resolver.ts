import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Request } from './models/request.model';
import { CreateSchedule } from './requestInputs/CreateSchedule';

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

  @Mutation(() => Boolean)
  async updateStatusBarbershop(
    @Args('newSchedule') scheduleData: CreateSchedule,
  ): Promise<boolean> {
    const newSchedules =
      await this.databaseService.createNewSchedule(scheduleData);

    return newSchedules;
  }

  @Mutation(() => Boolean)
  async updateStatusBarber(
    @Args('requestId') requestId: string,
  ): Promise<boolean> {
    const deletedRequest = await this.databaseService.deleteRequest(requestId);

    return deletedRequest;
  }
}
