import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Request {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  tipoServico: string;

  @Field(() => String, { nullable: true })
  nomeCliente: string;

  @Field(() => String, { nullable: true })
  data: string;

  @Field(() => Boolean, { nullable: true })
  visualizado: boolean;

  @Field(() => String, { nullable: true })
  emailCliente: string;

  @Field(() => String, { nullable: true })
  barbearia_id: string;

  @Field(() => String, { nullable: true })
  barbeiro_id: string;

  @Field(() => String, { nullable: true })
  avatar: string;
}
