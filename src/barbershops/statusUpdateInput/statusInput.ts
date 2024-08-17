import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StatusInput {
  @Field(() => String!)
  status: string;

  @Field(() => String!)
  id: string;
}
