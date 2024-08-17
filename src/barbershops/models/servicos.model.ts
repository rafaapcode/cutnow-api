import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Servicos {
  @Field(() => String, { nullable: true })
  nomeService: string;

  @Field(() => Int, { nullable: true })
  tempoMedio: number;

  @Field(() => Int, { nullable: true })
  preco: number;
}
