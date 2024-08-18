import { Field, ObjectType } from '@nestjs/graphql';
import { BarberInformations } from './barberInformations.model';

@ObjectType()
export class Barber {
  @Field(() => String)
  nome: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  status: string;

  @Field(() => BarberInformations, { nullable: true })
  informacoes: BarberInformations | null;
}
