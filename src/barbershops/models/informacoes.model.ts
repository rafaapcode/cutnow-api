import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Informacoes {
  @Field(() => String!)
  cep: string;

  @Field(() => String!)
  rua: string;

  @Field(() => String!)
  bairro: string;

  @Field(() => String!)
  cidade: string;

  @Field(() => String!)
  estado: string;

  @Field(() => Int!)
  numero: number;

  @Field(() => String!)
  horarioAbertura: string;

  @Field(() => String!)
  horarioFechamento: string;

  @Field(() => [String], { nullable: 'items' })
  fotosEstruturaBarbearia: string[];

  @Field(() => String!)
  fotoBanner: string;

  @Field(() => String!)
  logo: string;

  @Field(() => String!)
  status: string;
}
