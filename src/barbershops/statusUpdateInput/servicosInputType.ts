import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServicosInputType {
  @Field(() => String, { nullable: true })
  nomeService: string;

  @Field(() => Int, { nullable: true })
  tempoMedio: number;

  @Field(() => Int, { nullable: true })
  preco: number;
}
