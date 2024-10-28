import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Schedules {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  tipoServico: string;

  @Field(() => String, { nullable: true })
  nomeCliente: string;

  @Field(() => String, { nullable: true })
  data: string;

  @Field(() => String, { nullable: true })
  nomeBarbeiro: string;

  @Field(() => String, { nullable: true })
  barbearia_id: string;

  @Field(() => String, { nullable: true })
  barbeiro_id: string;
}

@ObjectType()
export class SchedulesOfToday {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  tipoServico: string;

  @Field(() => String, { nullable: true })
  nomeCliente: string;

  @Field(() => String, { nullable: true })
  data: string;

  @Field(() => String, { nullable: true })
  barbearia_id: string;

  @Field(() => String, { nullable: true })
  barbeiro_id: string;

  @Field(() => String, { nullable: true })
  clientAvatar: string;

  @Field(() => String, { nullable: true })
  barberAvatar: string;
}
