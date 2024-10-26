import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseService } from 'src/database/database.service';
import { Request } from './models/request.model';
import { CreateSchedule } from './requestInputs/CreateSchedule';

@Resolver()
export class RequestResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Request])
  async allRequests(
    @Args('barbeiroId', { type: () => String }) id: string,
  ): Promise<Request[] | null> {
    const requests = await this.databaseService.getAllRequests(id);
    return requests.data;
  }

  @Mutation(() => Boolean)
  async createNewSchedule(
    @Args('newSchedule') scheduleData: CreateSchedule,
  ): Promise<boolean> {
    const newSchedules =
      await this.databaseService.createNewSchedule(scheduleData);

    return newSchedules;
  }

  @Mutation(() => Boolean)
  async deleteRequest(@Args('requestId') requestId: string): Promise<boolean> {
    const deletedRequest = await this.databaseService.deleteRequest(requestId);

    return deletedRequest;
  }
}
