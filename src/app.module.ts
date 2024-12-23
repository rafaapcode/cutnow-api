import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { AuthMiddlware } from './authMiddleware';
import { BarberResolver } from './barber/barber.resolver';
import { BarbershopResolver } from './barbershops/barbershop.resolver';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { PrismaService } from './prisma.service';
import { RequestResolver } from './requests/request.resolver';
import { ScheduleResolver } from './schedules/schedule.resolver';

@Module({
  imports: [
    ApiModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/src/schame.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
      }),
      global: true,
    }),
  ],
  providers: [
    DatabaseService,
    PrismaService,
    BarbershopResolver,
    BarberResolver,
    RequestResolver,
    ScheduleResolver,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlware)
      .exclude({ path: '/graphql', method: RequestMethod.ALL });
  }
}
