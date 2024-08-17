import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Servicos {
  @Field(() => String!)
  nomeService: string;

  @Field(() => Int!)
  tempoMedio: number;

  @Field(() => Int!)
  preco: number;
}
