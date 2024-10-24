import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AllRequests {
  @Field(() => String!)
  barbeiroId: string;
}
