import { Field, InputType } from '@nestjs/graphql';
import { ServicosInputType } from './servicosInputType';

@InputType()
export class ServicosUpdate {
  @Field(() => String!)
  id: string;

  @Field(() => [ServicosInputType])
  servicos: ServicosInputType[];
}
