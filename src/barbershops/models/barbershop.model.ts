import { Field, ObjectType } from '@nestjs/graphql';
import { Barbers } from './barber.model';
import { Informacoes } from './informacoes.model';
import { Servicos } from './servicos.model';

@ObjectType()
export class Barbershop {
  @Field(() => String!)
  id: string;

  @Field(() => String!)
  email: string;

  @Field(() => String!)
  nome: string;

  @Field(() => String!)
  nomeDaBarbearia: string;

  @Field(() => String!)
  cnpj: string;

  @Field(() => String!)
  latitude: string;

  @Field(() => String!)
  longitude: string;

  @Field(() => Informacoes)
  informacoes: Informacoes;

  @Field(() => [Servicos], { nullable: 'itemsAndList' })
  servicos: Servicos[];

  @Field(() => [Barbers], { nullable: 'itemsAndList' })
  barbeiro: Barbers[];
}
