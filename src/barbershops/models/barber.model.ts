import { Field, ObjectType } from '@nestjs/graphql';
import { BarberInfo } from './barberInfo.model';

@ObjectType()
export class Barbers {
  @Field(() => String, { nullable: true })
  nome: string;

  @Field(() => BarberInfo, { nullable: true })
  informacoes: BarberInfo | null;
}
