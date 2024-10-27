import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSchedule {
  @Field(() => String, { nullable: true })
  requestId: string;

  @Field(() => String, { nullable: true })
  tipoServico: string;

  @Field(() => String, { nullable: true })
  nomeCliente: string;

  @Field(() => String, { nullable: true })
  data: string;

  @Field(() => String, { nullable: true })
  emailCliente: string;

  @Field(() => String, { nullable: true })
  barbearia_id: string;

  @Field(() => String, { nullable: true })
  barbeiro_id: string;
}
