import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BarberInformations {
  @Field(() => String, { nullable: true })
  portfolio: string;

  @Field(() => String, { nullable: true })
  banner: string;

  @Field(() => String, { nullable: true })
  foto: string;

  @Field(() => String, { nullable: true })
  descricao: string;
}
