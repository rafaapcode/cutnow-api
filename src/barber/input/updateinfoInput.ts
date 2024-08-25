import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BarberInformationsUpdate {
  @Field(() => [String], { nullable: true })
  portfolio: string[];

  @Field(() => String, { nullable: true })
  banner: string;

  @Field(() => String, { nullable: true })
  foto: string;

  @Field(() => String, { nullable: true })
  descricao: string;
}

@InputType()
export class BarberInfoUpdate {
  @Field(() => String!)
  id: string;

  @Field(() => BarberInformationsUpdate)
  informations: BarberInformationsUpdate;
}
